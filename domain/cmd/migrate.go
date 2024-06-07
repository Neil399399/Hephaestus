package cmd

import (
	"fmt"

	"github.com/spf13/cobra"
)

var PATH string

// migrateCmd represents the migrate command
var migrateCmd = &cobra.Command{
	Use:   "migrate",
	Short: "migrate date to database",
	Long:  `migrate date to database`,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println(PATH)
	},
}

func init() {
	rootCmd.AddCommand(migrateCmd)
	migrateCmd.Flags().StringVarP(&PATH, "consumers", "c", "", "consumers data path (required)")
	migrateCmd.Flags().StringVarP(&PATH, "devices", "d", "", "devices data path (required)")

}
