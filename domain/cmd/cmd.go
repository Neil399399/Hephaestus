/*
Copyright © 2022 NAME HERE <EMAIL ADDRESS>

*/
package cmd

import (
	"fmt"

	"Hephaestus/httpclient"

	log "github.com/sirupsen/logrus"

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

var logCmd = &cobra.Command{
	Use:   "log",
	Short: "log",
	Long:  `log`,
	Run: func(cmd *cobra.Command, args []string) {
		log.WithFields(log.Fields{
			"animal": "walrus",
		}).Info("A walrus appears")
	},
}

func init() {
	rootCmd.AddCommand(startCmd)
	rootCmd.AddCommand(versionCmd)
	rootCmd.AddCommand(logCmd)
}
