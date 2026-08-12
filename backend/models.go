package main

type Task struct {
	ID			int		`json:"id"`
	Title		string	`json:"title"`
	Description	string	`json:"description,omitempty"`
	Status		string	`json:"status"`
}