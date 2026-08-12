package main

import (
	"fmt"
	"net/http"
	"strings"
)

func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func main() {
	http.HandleFunc("/tasks", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:
			getTasks(w, r)
		case http.MethodPost:
			createTask(w, r)
		default:
			http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
		}
	})

	http.HandleFunc("/tasks/", func(w http.ResponseWriter, r *http.Request) {
		if strings.HasPrefix(r.URL.Path, "/tasks/") {
			switch r.Method {
			case http.MethodPut:
				updateTask(w, r)
			case http.MethodDelete:
				deleteTask(w, r)
			default:
				http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
			}
			return
		}

		http.NotFound(w, r)
	})

	fmt.Println("Servidor Kanban iniciado em http://localhost:8000")

	http.ListenAndServe(":8000", enableCORS(http.DefaultServeMux))
}
