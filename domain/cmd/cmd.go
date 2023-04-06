/*
Copyright © 2022 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"fmt"

	"Hephaestus/database"
	"Hephaestus/httpclient"

	"github.com/spf13/cobra"
)

// startCmd represents the server command
var startCmd = &cobra.Command{
	Use:   "start",
	Short: "Start server",
	Long:  `Start server`,
	Run: func(cmd *cobra.Command, args []string) {
		httpclient.HttpRun()
	},
}

var versionCmd = &cobra.Command{
	Use:   "version",
	Short: "server version",
	Long:  `server version`,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("0.1.0")
	},
}

var dbTestCmd = &cobra.Command{
	Use:   "dbtest",
	Short: "DB connection test",
	Long:  `"DB connection test"`,
	Run: func(cmd *cobra.Command, args []string) {
		client := database.DBClient{}
		client.ConnectPostgres()
	},
}

func init() {
	rootCmd.AddCommand(startCmd)
	rootCmd.AddCommand(versionCmd)
	rootCmd.AddCommand(dbTestCmd)
}
