package models

import "time"

const DEVICESTABLE = "devices"

type OS int

const (
	XP OS = iota
	WIN7H
	WIN7P
	WIN8H
	WIN8P
	WIN10H
	WIN10P
	WIN11H
	WIN11P
	SERVER2003
	SERVER2012
	SERVER2016
	SERVER2019
	SERVER2022
	LINUX
	UNKNOWN
)

type Antivirus int

const (
	PCCILLIN Antivirus = iota
	KASPERSKY
)

type state int

const (
	ACTIVED state = iota
	INACTIVED
	SCRAPPED
)

type DeviceExtension struct {
	OFFAcc     string
	Antivirus  Antivirus
	AntiSerial string
	AntiDated  time.Time
	EmailAcc   string
	EmailPwd   string
}

type Device struct {
	ID            int64           `gorm:"primary_key" json:"id"`
	ConsumerID    int64           `json:"consumer"`
	User          string          `json:"user"`
	PCNum         string          `json:"pc_num"`
	Department    string          `json:"department"`
	Specification string          `json:"specification"`
	DeviceID      string          `json:"deviceId"`
	OS            OS              `json:"os"`
	LANIP         string          `json:"lan_ip"`
	WirelessIP    string          `json:"wireless_ip"`
	LANMAC        string          `json:"lan_mac"`
	WirelessMAC   string          `json:"wireless_mac"`
	State         state           `json:"state"`
	CreateAt      time.Time       `json:"create_at"`
	Extension     DeviceExtension `json:"ext"`
}

func GetDevice(id int64) (Device, error) {
	d := Device{}
	result := db.Where("id = ?", id).Table(DEVICESTABLE).Find(&d)
	if result.Error != nil {
		return d, result.Error
	}
	return d, nil
}

func GetDevicesByConsumerID(cid int64) ([]Device, error) {
	ds := []Device{}
	result := db.Where("consumer = ?", cid).Table(DEVICESTABLE).Find(&ds)
	if result.Error != nil {
		return nil, result.Error
	}
	return ds, nil
}

func (d *Device) AddDevice() error {
	result := db.Table(DEVICESTABLE).Create(d)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (d *Device) UpdateDevice() error {
	result := db.Table(DEVICESTABLE).Save(d)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func DelDevice(id int64) error {
	result := db.Where("id = ?", id).Table(DEVICESTABLE).Delete(id)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

//for migrate
func AddDevices(ds []Device) error {
	result := db.Table(DEVICESTABLE).Create(ds)
	if result.Error != nil {
		return result.Error
	}
	return nil
}
