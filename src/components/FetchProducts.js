import React from "react";
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css"


export default class FetchProducts extends React.Component {

  state = {
    products  : [],
    loading: true
  };

  async componentDidMount() {

    const url = "https://app.getrecall.com/api/products";
    const response = await fetch(url);
    const data = await response.json();

    this.setState({ 
      products: data.products, 
      loading: false 
    });

  }

  render() {
    
    var data = this.state.products;

    if (this.state.loading) {
      return <div style={{display : "flex", justifyContent : "center", alignItems : "center", flexDirection : "column"}}>
                <div style={{marginTop : "200px"}}></div>
                <img width = "200" src="logo512.png"/>
                <h2>Data are coming</h2>
              </div>;
    }

    return (
        <div>
          <h1 style={{textAlign: "center", color: "#1ce", marginBottom : "40px"}}>All products</h1>
          <ReactTable
            className="-striped -highlight"
            data={data}
            filterable
            columns={
              [
                {
                  Header: "Image",
                  width : 300,
                  Cell: row => (
                    <div>
                      <a style={{display : "flex", justifyContent : "center"}} href={row.original.link} target="_blank"><img alt="none" rel="noreferrer" height="150" src={row.original.thumbnail}/></a>
                      <p style={{textAlign : "center"}}>{row.original.name}</p>
                    </div>
                  )
                },
                {
                  Header: "Specifications",
                  width : 500,
                  Cell: row => (
                    <ReactTable
                      className="-striped -highlight"
                      data={row.original.specifications}
                      columns={[{
                        Header: "name",
                        accessor: "name",
                      },{
                        Header: "category",
                        accessor: "category",
                      },{
                        Header: "value",
                        accessor: "value",
                      }]}
                      showPagination={true}
                      defaultPageSize={3}
                    ></ReactTable>
                    )
                },
                {
                  Header: "Features",
                  width :300,
                  Cell: row => {
                    
                    const myArrCreatedFromMap =  row.original.features.map((item, i) => (<li key={{i}}>{item}</li>)); 
                    const myList = (
                      <ul style={{padding : "20px", textAlign : "left", listStyle : "none", overflowX : "scroll"}}>{myArrCreatedFromMap}</ul> 
                    )
                    return myList
                  },
                },
                {
                  Header: "Category",
                  accessor: "category",
                  width :200,
                  filterMethod: (filter, row) => {
                    if (filter.value === "0") {
                      return true;
                    }
                    else if (filter.value === "1") {
                      return row[filter.id] === "Embedded Flash Storage";
                    }
                    return row[filter.id] === "GPU & Edge AI";
                  },
                  Filter: ({ filter, onChange }) =>
                  <select
                    onChange={event => onChange(event.target.value)}
                    style={{ width: "100%" }}
                    value={filter ? filter.value : "0"}
                  >
                    <option value="0">Show All</option>
                    <option value="1">Embedded Flash Storage</option>
                    <option value="2">GPU & Edge AI</option>
                  </select>
                },
                {
                 Header: "Product_id",
                 accessor: "_id",
                 width :150,
               },
               {
                Header: "pid",
                accessor: "pid",
                width :150,
               },
               {
                Header: "Description",
                accessor: "description",
                width :150,
               },
               
               {
                 Header: "Subcategory",
                 accessor: "subcategory",
                 width :150,
               },
               {
                 Header: "CreatedAt",
                 accessor: "createdAt",
                 width :150,
               },
               {
                 Header: "UpdatedAt",
                 accessor: "updatedAt",
                 width :150,
               },
               {
                 Header: "modelId",
                 accessor: "modelId",
                 width :150,
               },
               {
                 Header: "Datasheet",
                 width :150,
                 Cell: row => (
                  <div>
                    <a style={{display : "flex", justifyContent : "center", textDecoration : "none"}} href={row.original.datasheet} target="_blank"><button>Download file</button></a>
                  </div>
                )
               }
             ]
            }
            defaultPageSize={10}
          ></ReactTable>
      </div>
    );
  }
}
