package models

import "time"

type ConsumerExtension struct {
}

type Consumer struct {
	ID       int    `gorm:"primary_key" json:"id"`
	Name     string `json:"name"`
	Addr     string `json:"addr"`
	Tel      string `json:"tel"`
	IPAddr   string `json:"ip_addr"`
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
	result := db.Table(CONSUMER).Where("tel = ?",tel).Find(&c)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (c *ConsumerExtension) GetConsumerExtension(id int) error {
	result := db.Table(CONSUMER).Select("extension").Where("id = ?", id).Find(&c)
	if result.Error != nil {
		return result.Error
	}
	return nil
}


func (c *Consumer) AddNewConsumer(consumer Consumer) error {
	result := db.Table(CONSUMER).Create(&consumer)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (c *Consumer) EditConsumer(consumer Consumer) error {
	result := db.Table(CONSUMER).Save(&consumer)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (c *Consumer) DeleteConsumer(id int) error {
	result := db.Table(CONSUMER).Delete(&Consumer{},id)
	if result.Error != nil {
		return result.Error
	}
	return nil
}
