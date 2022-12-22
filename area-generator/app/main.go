package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"net/http"
	"nokogiriwatir/area-selector/internal/RouteHandler"
	"strings"
)

func main() {
	router := gin.Default()

	router.Use(static.Serve("/", static.LocalFile("./public", true)))
	router.NoRoute(func(c *gin.Context) {
		if !strings.HasPrefix(c.Request.RequestURI, "/api") {
			c.File("./public/index.html")
		}
		//default 404 page not found
	})

	router.Use(cors.Default())
	router.GET("/", root)
	router.GET("/streets", RouteHandler.StreetsHandler)
	router.GET("/numbers/:street", RouteHandler.NumberHandler)
	router.GET("/area", RouteHandler.AreaHandlerGet)

	router.Run()
}

func root(g *gin.Context) {
	g.HTML(http.StatusOK, "index.html", nil)
}
