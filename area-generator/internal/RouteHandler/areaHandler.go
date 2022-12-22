package RouteHandler

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/jung-kurt/gofpdf"
	"net/http"
	"nokogiriwatir/area-selector/internal/DBService"
	"nokogiriwatir/area-selector/internal/Structures"
	"strconv"
	"strings"
)

func AreaHandlerGet(g *gin.Context) {
	areaNumbers := Structures.AreaNumbers{
		Street:      g.Query("street"),
		HouseNumber: g.Query("houseNumbers"),
	}

	houseNumberFormatted := make([]string, 0)

	houseNumbersRaw := strings.Split(areaNumbers.HouseNumber, ",")

	for _, val := range houseNumbersRaw {
		houseNumberFormatted = append(houseNumberFormatted, "'"+val+"'")
	}

	db := DBService.PgConnection()
	defer db.Close()

	query := fmt.Sprintf("SELECT street,  house_number, number, names FROM address WHERE street=%s AND house_number IN (%s) ORDER by house_number", "'"+areaNumbers.Street+"'", strings.Join(houseNumberFormatted, ","))

	// Query the database for the phone numbers
	rows, err := db.Query(query)
	if err != nil {
		g.String(http.StatusInternalServerError, "Error querying the database: %v", err)
		return
	}
	defer rows.Close()

	// Create a PDF document
	pdf := gofpdf.New("P", "mm", "A4", "")
	pdf.AddPage()

	// Add a table to the PDF with the query results
	pdf.AddUTF8Font("DejaVuSans", "", "DejaVuSans.ttf")
	pdf.SetFont("DejaVuSans", "", 14)

	pdf.Cell(40, 10, "Улица")
	pdf.Cell(40, 10, "Номер Дома")
	pdf.Cell(40, 10, "Телефон")
	pdf.Cell(40, 10, "Имя")
	pdf.Ln(-1)

	count := 1

	numbersToTable := make([]string , 0)


	for rows.Next() {
		var street string
		var houseNumber string
		var phoneNumber string
		var name string

		if err := rows.Scan(&street, &houseNumber, &phoneNumber, &name); err != nil {
			g.String(http.StatusInternalServerError, "Error scanning row: %v", err)
			return
		}

		numbersToTable = append(numbersToTable, phoneNumber)

		pdf.Cell(40, 10, strconv.Itoa(count)+")"+street)
		pdf.Cell(40, 10, houseNumber)
		pdf.Cell(40, 10, phoneNumber)
		pdf.Cell(40, 10, name)
		pdf.Ln(-1)
		count++
	}

	//create table
	pdf.AddPage()

	for ind ,val := range numbersToTable {
		//pdf.Cell(40, 10, val)
		pdf.CellFormat(40, 10, val, "1", 0, "M", false, 0, "")

		if (ind+1) % 3 == 0 {
			pdf.Ln(-1)
		}
	}

	// Write the PDF to the response
	g.Header("Content-Type", "application/pdf")
	g.Header("Access-Control-Allow-Origin", "*")
	erPdf := pdf.Output(g.Writer)
	if erPdf != nil {
		return
	}
}
