package main

import (
	"github.com/gopherjs/gopherjs/js"
	"github.com/hashicorp/hcl"
)

func parse(src []byte) (interface{}, error) {
	var result interface{}
	var err = hcl.Unmarshal(src, &result)

	if err != nil {
		return nil, err
	}

	return result, nil
}

func main() {
	js.Module.Get("exports").Set("parse", parse)
}
