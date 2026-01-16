SHELL := /bin/bash

PROTOC ?= protoc
PROTO_FILES := contracts/tracking-server/proto/v1/tracking.proto

# Reproducible plugin versions (adjust if needed)
PROTOC_GEN_GO_VERSION ?= v1.30.0
PROTOC_GEN_GO_GRPC_VERSION ?= v1.3.0

.PHONY: all proto tools-install clean

GEN_DIR=tracking-server/grpc

all: proto

# Install required protoc plugin binaries
tools-install:
	@echo "Installing protoc-gen-go and protoc-gen-go-grpc..."
	go install google.golang.org/protobuf/cmd/protoc-gen-go@${PROTOC_GEN_GO_VERSION}
	go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@${PROTOC_GEN_GO_GRPC_VERSION}

# Generate Go sources (source_relative keeps files next to proto files)
proto: $(PROTO_FILES)
	@echo "Generating Go protobufs for `$(PROTO_FILES)`..."
	$(PROTOC) -I. \
		--go_out=$(GEN_DIR) \
		--go-grpc_out=$(GEN_DIR) \
		$(PROTO_FILES)

# Remove generated files
clean:
	-@rm -rf $(GEN_DIR)/tracking
