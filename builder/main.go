package main

import (
	"encoding/json"
	"fmt"
	"os"

	"github.com/gopherjs/gopherjs/js"
	"github.com/hashicorp/hcl2/hcl"
	"github.com/hashicorp/hcl2/hclpack"
)

func parse(src []byte) (interface{}, error) {
	body, diags := hclpack.PackNativeFile([]byte(src), "", hcl.Pos{Line: 1, Column: 1})
	if diags.HasErrors() {
		fmt.Fprintf(os.Stderr, "Failed to parse: %s", diags.Error())
		return nil, diags
	}
	result, err := body.MarshalJSON()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Failed to marshal: %s", err)
		return nil, err
	}

	var jobj interface{}
	json.Unmarshal(result, &jobj)

	return jobj, nil
}

func main() {
	js.Module.Get("exports").Set("parse", parse)
}
