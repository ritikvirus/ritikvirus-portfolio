# Multi-arch Docker build with Buildx

IMAGE ?= ghcr.io/ritikvirus/portfolio:latest
PLATFORMS ?= linux/amd64,linux/arm64

.PHONY: dockerx-create build push

dockerx-create:
	@docker buildx inspect multiarch-builder >/dev/null 2>&1 || docker buildx create --name multiarch-builder --use
	@docker buildx use multiarch-builder
	@docker buildx inspect --bootstrap

build: dockerx-create
	docker buildx build \
		--platform $(PLATFORMS) \
		--tag $(IMAGE) \
		--provenance=false \
		--sbom=false \
		--build-arg BUILDKIT_INLINE_CACHE=1 \
		--pull \
		--load \
		.

push: dockerx-create
	docker buildx build \
		--platform $(PLATFORMS) \
		--tag $(IMAGE) \
		--provenance=false \
		--sbom=false \
		--build-arg BUILDKIT_INLINE_CACHE=1 \
		--pull \
		--push \
		.
