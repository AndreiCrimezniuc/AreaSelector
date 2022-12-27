FROM golang:1.18-alpine as dev

WORKDIR /app
COPY . /app/
RUN go mod download

RUN CGO_ENABLED=0 go build -o /go/bin/app

FROM gcr.io/distroless/static-debian11 as prod

COPY --from=dev go/bin/app /

EXPOSE 8080
CMD ["/app"]
