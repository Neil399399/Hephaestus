package models

import (
	"encoding/csv"
	"fmt"
	"io"
	"log"
	"os"
	"strconv"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestGetDevice(t *testing.T) {
	d, err := GetDevice(1)
	if err != nil {
		assert.Fail(t, err.Error())
	}
	fmt.Printf("%+v\n", d)
}

func TestGetDevicesByConsumerId(t *testing.T) {
	ds, err := GetDevicesByConsumerID(1)
	if err != nil {
		assert.Fail(t, err.Error())
	}
	fmt.Printf("%+v\n", ds)
}

func TestAddDevice(t *testing.T) {

	d := Device{
		ID:            1,
		ConsumerID:    1,
		User:          "Alice",
		DeviceID:      "PC-001",
		Department:    "PM",
		State:         0,
		Specification: "",
		OS:            6,
		LANIP:         "111.111.111.111",
		LANMAC:        "AC-5A-FC-F9-C9-9B",
		WirelessIP:    "111.111.111.111",
		WirelessMAC:   "AC-5A-FC-F9-C9-9B",
		CreateAt:      time.Now(),
	}
	err := d.AddDevice()
	if err != nil {
		assert.Fail(t, err.Error())
	}
}

func TestUpdateDevice(t *testing.T) {
	d := Device{
		ID:            1,
		ConsumerID:    6,
		User:          "Bob",
		Department:    "PM",
		DeviceID:      "PC-052",
		State:         2,
		Specification: "",
		OS:            10,
		LANIP:         "8.8.8.8",
		LANMAC:        "AC-5A-FC-F9-C9-9B",
		WirelessIP:    "111.111.111.111",
		WirelessMAC:   "AC-5A-FC-F9-C9-9B",
		CreateAt:      time.Now(),
	}
	err := d.UpdateDevice()
	if err != nil {
		assert.Fail(t, err.Error())
	}
}

func TestDeleteDevice(t *testing.T) {
	err := DelDevice(1)
	if err != nil {
		assert.Fail(t, err.Error())
	}
}

func TestParse(t *testing.T) {
	const FilePath = `C:\Users\User\Documents\eample0.csv`
	file, err := os.OpenFile(FilePath, os.O_RDONLY, 0777)
	if err != nil {
		log.Fatalln("找不到CSV檔案路徑:", FilePath, err)
	}

	// read
	r := csv.NewReader(file)
	r.Comma = ','
	var devs []Device
	for {
		id := 0
		record, err := r.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			log.Fatalln(err)
		}

		var os int
		if record[5] == "" {
			os = 15
		} else {
			os, err = strconv.Atoi(record[5])
			if err != nil {
				log.Fatalln(err)
			}
		}

		device := Device{
			ID:            int64(id),
			ConsumerID:    1,
			State:         0,
			User:          record[0],
			PCNum:         record[1],
			Department:    record[2],
			Specification: record[3],
			DeviceID:      record[4],
			OS:            OS(os),
			LANIP:         record[6],
			WirelessIP:    record[7],
			LANMAC:        record[8],
			WirelessMAC:   record[9],
			CreateAt:      time.Now(),
		}
		devs = append(devs, device)
		id++
	}
}
