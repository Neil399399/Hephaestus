package models

type User struct {
	ID       int    `gorm:"primary_key" json:"id"`
	Username string `json:"username"`
	Password string `json:"password"`
	Email    string `json:"email"`
	CreateAt string `json:"create_at"`
}

func (u *User) GetUser() error {
	result := db.Where("username = ? AND password = ?", u.Username, u.Password).Table("users").Find(&u)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (u *User) AddUser(user User) error {
	result := db.Table("users").Create(&user)
	if result.Error != nil {
		return result.Error
	}
	return nil
}
