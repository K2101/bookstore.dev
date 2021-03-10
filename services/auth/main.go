package main

import (
	auth "auth/authpb"
	"context"
	"database/sql"
	"fmt"
	"log"
	"net"
	"strconv"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	_ "github.com/lib/pq"
	"github.com/soheilhy/cmux"
	"golang.org/x/crypto/bcrypt"
	"google.golang.org/grpc"
)

// Database instance
var db *sql.DB

// Database settings
const (
	host     = "postgres-cluster-ip-service"
	port     =  5432 // Default port
	user     = "postgres"
	password = "postgres"
	dbname   = "postgres"
)

// auth struct
type Auth struct {
	ID int `json:"id"`
	Email   string `json:"email"`
	Password string `json:"password"`
}

// auth gRPC server struct
type authServer struct {
}


func main() {
	
	// Connect to postgres
	if err := Connect(); err != nil {
		log.Fatal("WTF!!!" ,err)
	}

	// Create the main listener.
	l, err := net.Listen("tcp", ":3000")
	if err != nil {
		log.Fatal(err)
	}

	// Create a cmux.
	m := cmux.New(l)

	// Match connections in order:
	// First grpc, then HTTP
	grpcL := m.Match(cmux.HTTP2HeaderField("content-type", "application/grpc"))
	httpL := m.Match(cmux.HTTP1Fast())

	
	grpcServer := grpc.NewServer()
	auth.RegisterAuthServer(grpcServer, newAuthServer())

	// gRPC
	go grpcServer.Serve(grpcL)
	// go/fiber
	go serveHTTP(httpL)

	m.Serve()

}

func serveHTTP(l net.Listener) {
	app := fiber.New()


	app.Post("/api/auth/signup", Signup)
	app.Post("/api/auth/login", Login)


	app.Listener(l)
}

// gRPC function
func (s *authServer) AuthFunction(c context.Context, req *auth.AuthRequest) (*auth.AuthResponse, error) {
	result := req.Jwt

	claims := jwt.MapClaims{}

	jwtde, _ := jwt.ParseWithClaims(result, claims, nil)

	claims,  validate := jwtde.Claims.(jwt.MapClaims)

	_ = validate

	id := claims["id"]

	row, _ := db.Query("SELECT * FROM auth  WHERE id = $1 ", id)
	defer row.Close()

	authDetails := Auth{}

	for row.Next() {
		rowscan := Auth{}
		row.Scan(&rowscan.ID,&rowscan.Email, &rowscan.Password)

		authDetails = rowscan

	}

		response := auth.AuthResponse{
			Id: strconv.Itoa(authDetails.ID),
			Email: string(authDetails.Email),
		}

		return &response, nil

	}

	// gRPC authServer pointer
	func newAuthServer() *authServer {
		return &authServer{}
}

func Signup(c *fiber.Ctx) error {
	fmt.Println("Signup")

	// New Auth struct
	user := new(Auth)

	// Parse body into struct
	if err := c.BodyParser(user); err != nil {
		return c.Status(400).SendString(err.Error())
	}

	// Email in use validation

	
	password := []byte(user.Password)
			// Hashing the password with the default cost of 10
			hashedPassword, err := bcrypt.GenerateFromPassword(password, bcrypt.DefaultCost)
			if err != nil {
					panic(err)
			}
			// fmt.Println(string(hashedPassword))


		hash := string(hashedPassword)

		// Insert into database
		row, err := db.Query("INSERT INTO auth (email, password) VALUES ($1, $2) RETURNING *", user.Email, hash)
		if err != nil {
			return err
		}
		defer row.Close()

		result := Auth{}

		for row.Next() {
			auth := Auth{}
			if err := row.Scan(&auth.ID,&auth.Email, &auth.Password); err != nil {
				return err // Exit if we get an error
			}

			result = auth
	}

	token := jwt.New(jwt.SigningMethodHS256)

	claims := token.Claims.(jwt.MapClaims)
	claims["id"] = result.ID
	claims["email"] = result.Email
	claims["exp"] = time.Now().Add(time.Hour * 2160).Unix()

	t, err := token.SignedString([]byte("this-is-secret-dont-try-to-hack-it"))
	if err != nil {
		return	c.SendStatus(fiber.StatusInternalServerError)

	}

	return c.SendString(t)
}


func Login(c *fiber.Ctx) error {
	fmt.Println("Login")

	user := new(Auth)

	if err := c.BodyParser(user); err != nil {
		return c.Status(400).SendString(err.Error())
	}

	row, err := db.Query("SELECT * FROM auth  WHERE email = $1 ", user.Email)
	if err != nil {
		return c.Status(404).SendString(err.Error())
	}
	defer row.Close()

	result := Auth{}

	for row.Next() {
		auth := Auth{}
		if err := row.Scan(&auth.ID,&auth.Email, &auth.Password); err != nil {
			return err // Exit if we get an error

		}

		result = auth

		hashedPassword := []byte(result.Password)

		// Comparing the password with the hash
		err = bcrypt.CompareHashAndPassword(hashedPassword, []byte(user.Password))
		if err != nil {
			return c.Status(400).JSON("Invalid Credentials")
		}

	}

	token := jwt.New(jwt.SigningMethodHS256)

	claims := token.Claims.(jwt.MapClaims)
	claims["id"] = result.ID
	claims["email"] = result.Email
	claims["exp"] = time.Now().Add(time.Hour * 2160).Unix()

	t, err := token.SignedString([]byte("this-is-secret-dont-try-to-hack-it"))
	if err != nil {
		return	c.SendStatus(fiber.StatusInternalServerError)

	}

	return c.SendString(t)
}

// Connect function
func Connect() error {
	var err error
	db, err = sql.Open("postgres", fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname))
	if err != nil {
		return err
	}
	if err = db.Ping(); err != nil {
		return err
	}

	_, err = db.Query(`CREATE TABLE IF NOT EXISTS auth (
    id SERIAL PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    password VARCHAR NOT NULL 
	)`)
	if err != nil {
		return err
	}

	return nil
}