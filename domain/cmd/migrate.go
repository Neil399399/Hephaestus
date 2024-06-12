package cmd

import (
	"Hephaestus/models"
	"encoding/csv"
	"fmt"
	"io"
	"os"
	"strconv"
	"time"

	"github.com/spf13/cobra"
)

var PATH string

// migrateCmd represents the migrate command
var migrateCmd = &cobra.Command{
	Use:   "migrate",
	Short: "migrate date to database",
	Long:  `migrate date to database`,
	Run: func(cmd *cobra.Command, args []string) {
		if len(args) == 0 {
			fmt.Println(`Use "Hephaestus migrate --help" for more information about a command.`)
			return
		}

		if PATH != "" {
			devs, err := deviceParser(PATH)
			if err != nil {
				fmt.Println("parser file error!!", err)
			} else {
				err = models.AddDevices(devs)
				if err != nil {
					fmt.Println("save to DB error!!", err)
				}
				fmt.Println("succeed to insert DB!!")
			}
		} else {
			fmt.Println(`Use "Hephaestus migrate --help" for more information about a command.`)
		}
	},
}

func init() {
	rootCmd.AddCommand(migrateCmd)
	migrateCmd.Flags().StringVarP(&PATH, "consumers", "c", "", "consumers data path (required)")
	rootCmd.MarkFlagRequired("consumers")
	migrateCmd.Flags().StringVarP(&PATH, "devices", "d", "", "devices data path (required)")
	rootCmd.MarkFlagRequired("devices")
}

func deviceParser(path string) ([]models.Device, error) {
	// const FilePath = `C:\Users\User\Documents\eample0.csv`
	file, err := os.OpenFile(path, os.O_RDONLY, 0777)
	if err != nil {
		fmt.Println("找不到CSV檔案路徑:", path)
		return nil, err
	}

	// read
	r := csv.NewReader(file)
	r.Comma = ','
	var devs []models.Device
	for {
		id := 0
		record, err := r.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			return nil, err
		}
		var os int
		if record[5] == "" {
			os = 15
		} else {
			os, err = strconv.Atoi(record[5])
			if err != nil {
				return nil, err
			}
		}

		device := models.Device{
			ID:            int64(id),
			ConsumerID:    1,
			State:         0,
			User:          record[0],
			PCNum:         record[1],
			Department:    record[2],
			Specification: record[3],
			DeviceID:      record[4],
			OS:            models.OS(os),
			LANIP:         record[6],
			WirelessIP:    record[7],
			LANMAC:        record[8],
			WirelessMAC:   record[9],
			CreateAt:      time.Now(),
		}
		devs = append(devs, device)
		id++
	}
	return devs, nil
}
