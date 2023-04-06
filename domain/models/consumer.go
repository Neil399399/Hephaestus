package models

type ConsumerExtension struct {

}


type Consumer struct {
	ID       int    `gorm:"primary_key" json:"id"`
	Name string `json:"name"`
	Addr string `json:"address"`
	Tel    string `json:"tel"`
	IPAddr string `json:"ip_address"`
	CreateAt string `json:"create_at"`
}

func (c *Consumer) GetConsumers() error {
	result := db.Table("consumers").Find(&c)
	if result.Error != nil {
		return result.Error
	}
	return nil
}
