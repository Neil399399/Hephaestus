package models

import "time"

type ConsumerExtension struct {
}

type Consumer struct {
	ID       int64     `gorm:"primary_key" json:"id"`
	Name     string    `json:"name"`
	TaxID    string    `json:"taxId"`
	Addr     string    `json:"addr"`
	Tel      string    `json:"tel"`
	Contact  string    `json:"contract"`
	CreateAt time.Time `json:"create_at"`
}

const CONSUMER = "consumers"

func GetConsumers() ([]Consumer, error) {
	c := []Consumer{}
	result := db.Table(CONSUMER).Find(&c)
	if result.Error != nil {
		return nil, result.Error
	}
	return c, nil
}

func (c *Consumer) GetConsumerById(id int) error {
	result := db.Table(CONSUMER).Where("id = ?", id).Find(&c)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (c *Consumer) GetConsumerByName(name string) error {
	result := db.Table(CONSUMER).Where("name = ?", name).Find(&c)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (c *Consumer) GetConsumerByTel(tel string) error {
	result := db.Table(CONSUMER).Where("tel = ?", tel).Find(&c)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (c *ConsumerExtension) GetConsumerExtension(id int64) error {
	result := db.Table(CONSUMER).Select("extension").Where("id = ?", id).Find(&c)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (c *Consumer) AddNewConsumer() error {
	result := db.Table(CONSUMER).Create(&c)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (c *Consumer) EditConsumer() error {
	result := db.Table(CONSUMER).Save(&c)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func DeleteConsumer(id int64) error {
	result := db.Table(CONSUMER).Delete(&Consumer{}, id)
	if result.Error != nil {
		return result.Error
	}
	return nil
}
