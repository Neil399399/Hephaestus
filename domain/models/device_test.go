package models

import (
	"fmt"
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
		State:         0,
		Specification: "",
		OS:            6,
		IP:            "111.111.111.111",
		MACAddr:       "AC-5A-FC-F9-C9-9B",
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
		DeviceID:      "PC-052",
		State:         2,
		Specification: "",
		OS:            10,
		IP:            "888.11.8.1",
		MACAddr:       "AC-5A-FC-F9-C9-9B",
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
