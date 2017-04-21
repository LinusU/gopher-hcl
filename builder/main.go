package main

import (
	"bufio"
	"bytes"
	"encoding/json"

	"github.com/gopherjs/gopherjs/js"
	"github.com/hashicorp/hcl"
	"github.com/hashicorp/hcl/hcl/printer"
	jsonParser "github.com/hashicorp/hcl/json/parser"
)

func parse(src []byte) (interface{}, error) {
	var result interface{}
	var err = hcl.Unmarshal(src, &result)

	if err != nil {
		return nil, err
	}

	return result, nil
}

func stringify(src interface{}) ([]byte, error) {
	var err error

	json, err := json.Marshal(src)
	if err != nil {
		return nil, err
	}

	ast, err := jsonParser.Parse(json)
	if err != nil {
		return nil, err
	}

	var result bytes.Buffer

	err = printer.Fprint(bufio.NewWriter(&result), ast)
	if err != nil {
		return nil, err
	}

	return result.Bytes(), nil
}

func main() {
	js.Module.Get("exports").Set("parse", parse)
	js.Module.Get("exports").Set("stringify", stringify)
}
