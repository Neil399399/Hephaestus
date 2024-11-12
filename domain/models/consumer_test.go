package models

import (
	"fmt"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestGetConsumers(t *testing.T) {
	cs, err := GetConsumers()
	if err != nil {
		assert.Fail(t, err.Error())
	}
	fmt.Printf("%+v\n", cs)
}

func TestGetConsumerById(t *testing.T) {
	c := Consumer{}
	err := c.GetConsumerById(5)
	if err != nil {
		assert.Fail(t, err.Error())
	}
	fmt.Printf("%+v\n", c)
}

func TestInsertConsumer(t *testing.T) {
	c := Consumer{
		Name:     "test",
		Addr:     "Addr",
		Tel:      "0987654321",
		TaxID:    "123456",
		CreateAt: time.Now(),
	}
	err := c.AddNewConsumer()
	if err != nil {
		assert.Fail(t, err.Error())
	}
}

func TestUpdateConsumer(t *testing.T) {
	c := Consumer{
		ID:       5,
		Name:     "update",
		Addr:     "Addr",
		Tel:      "0987654331",
		TaxID:    "123456",
		CreateAt: time.Now(),
	}
	err := c.EditConsumer()
	if err != nil {
		assert.Fail(t, err.Error())
	}
}

func TestDeleteConsumer(t *testing.T) {
	err := DeleteConsumer(5)
	if err != nil {
		assert.Fail(t, err.Error())
	}
}
