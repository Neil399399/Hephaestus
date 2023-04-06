package models

type ConsumerExtension struct {
}

type Consumer struct {
	ID       int    `gorm:"primary_key" json:"id"`
	Name     string `json:"name"`
	Addr     string `json:"address"`
	Tel      string `json:"tel"`
	IPAddr   string `json:"ip_address"`
	CreateAt string `json:"create_at"`
}

func GetConsumers() ([]Consumer, error) {
	c := []Consumer{}
	result := db.Table("consumers").Find(&c)
	if result.Error != nil {
		return nil, result.Error
	}
	return c, nil
}

func (c *Consumer) GetConsumerById(id int) error {
	result := db.Where("id = ?", id).Table("consumers").Find(&c)
	if result.Error != nil {
		return result.Error
	}
	return nil
}