/*
Copyright © 2022 NAME HERE <EMAIL ADDRESS>

*/
package cmd

import (
	"fmt"

	log "github.com/sirupsen/logrus"

	"github.com/spf13/cobra"
)

// serverCmd represents the server command
var serverCmd = &cobra.Command{
	Use:   "server",
	Short: "A brief description of your command",
	Long: `A longer description that spans multiple lines and likely contains examples
and usage of using your command. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("server called")
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
	rootCmd.AddCommand(serverCmd)
	rootCmd.AddCommand(versionCmd)
	rootCmd.AddCommand(logCmd)
}
