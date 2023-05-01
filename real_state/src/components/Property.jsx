import React, {useState, useEffect} from 'react'
import Card from 'react-bootstrap/Card'
import Offcanvas from 'react-bootstrap/Offcanvas'
import axios from 'axios'
import Table from 'react-bootstrap/Table';


export default function Property(props) {
  const [show, setShow] = useState(false);
  const [taxMapKey, setTaxMapKey] = useState(props.tmk)
  const [saleRecords, setSaleRecords] = useState([])
  const [assessments, setAssessments] = useState([])
  const [taxRecords, setTaxRecords] = useState([])
  const [nearbySchools, setNearbySchools] = useState([])
  const [districtNum, setDistrictNum] = useState(props.district_zone)
  const [districtName, setDistrictName] = useState([])


  useEffect(() => {
    setTaxMapKey(props.tmk)
  }, [])

  useEffect(() => {
    setDistrictNum(props.district_zone)
  },[])


  const handleClose = () => {
    setShow(false);
  } 
  const handleShow = () => {
    setShow(true)
    querySaleRecords(taxMapKey)
    queryAssessments(taxMapKey)
    queryTaxRecords(taxMapKey)
    queryNearybySchools(districtNum)
    queryDistrictName(districtNum)
  };

  function querySaleRecords(taxMapKey) {
    axios.post("/api/search/sale-records", {
        taxMapKey: taxMapKey 
    }).then((response) => {
        setSaleRecords(response.data)
    })
  }

  function queryAssessments(taxMapKey) {
    axios.post("/api/search/assessments", {
      taxMapKey: taxMapKey
    }).then((response) => {
      setAssessments(response.data)
    })
  }

  function queryTaxRecords(taxMapKey) {
    axios.post("/api/search/tax-records", {
      taxMapKey: taxMapKey
    }).then((response) => {
      setTaxRecords(response.data)
    })
  }

  function queryNearybySchools(districtNum) {
    axios.post("/api/search/nearby-schools", {
      districtNum: districtNum
    }).then((response) => {
      setNearbySchools(response.data)
    })
  }

  function queryDistrictName(districtNum) {
    axios.post("/api/search/district-name", {
      districtNum: districtNum
    }).then((response) => {
      setDistrictName(response.data)
    })
  }

  return (
    <Card style={{ width: '20rem' }}>
      <Card.Body>
        <Card.Title>
          {props.street_num} {props.street_name}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {props.city}, {props.state} {props.zipcode}
        </Card.Subtitle>
        <Card.Text>
          Asking Price: {props.asking_price}
        </Card.Text>
  
        <Card.Link className='text-decoration-none' onClick={handleShow}>
          More Info
        </Card.Link> 
        <Offcanvas show={show} onHide={handleClose} placement='end'>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Tax Map Key: {props.tmk}</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="pt-2 pb-1">
            {props.street_num} {props.street_name} <br/>
            {props.city}, {props.state} {props.zipcode} <br/>
            </div>
            <div className="pt-1 pb-1">
            <strong>Asking Price:</strong> ${props.asking_price}
            </div>
            {props.hoa_fee != null &&
            <div className='pt-1 pb-1'>
              <strong>HOA Fees:</strong> ${props.hoa_fee}
              </div>}
            <div className="pt-1 pb-1">
              {props.houseBed != null && <><strong>Bedrooms:</strong> {props.houseBed}<br/></>}
              {props.houseBath != null && <><strong>Bathrooms:</strong> {props.houseBath}</>}
              {props.condoBed != null && <><strong>Bedrooms:</strong> {props.condoBed}<br/></>}
              {props.condoBath != null && <><strong>Bathrooms:</strong> {props.condoBath}</>}
            </div>
            <div className="pt-1 pb-1">
            {props.acres != null && <>Acreage: {props.acres}<br/></>}
            {props.sq_ft != null && <>Square Footage: {props.sq_ft}</>}
            </div>
            <div className="pt-1 pb-1">
              <strong>District Name:</strong> {districtName.map(name => <>{name.Zone_Name}</>)}
            <br/>
            <strong>Lava Zone:</strong> {props.lava_zone}
            </div>
            <div className="pt-1 pb-1">
            <strong>Realtor:</strong> {props.realtor_id}
            </div>

            <div className="pt-1, pb-1">
              <strong>Sale Record:</strong>  
              <Table className="pt-5" striped bordered hovered="sm">
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Sold</th>
                  </tr>
                </thead>
                <tbody>
                  {saleRecords.map((record) => (
                    props.tmk === record.TMK &&
                      <tr key={record.Transaction_ID}>
                        <td>{record.Year}</td>
                        <td>${record.Sale_Price}</td>
                      </tr>
                  ))}
                </tbody>

              </Table>
            </div>

            <div className="pt-1, pb-1">
              <strong>Assessments:</strong>  
              <Table className="pt-5" striped bordered hovered="sm">
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Assessed</th>
                    <th>Market</th>
                    <th>Property Tax</th>
                  </tr>
                </thead>
                <tbody>
                  {assessments.map((item) => (
                    props.tmk === item.TMK &&
                      <tr key={item.Report_Num}>
                        <td>{item.Year}</td>
                        <td>${item.Assessed_Value}</td>
                        <td>${item.Market_Value}</td>
                        <td>${item.Estimated_Property_Tax}</td>
                      </tr>
                  ))}
                </tbody>

              </Table>
            </div>

            <div className="pt-1, pb-1">
              <strong>Tax History:</strong>  
              <Table className="pt-5" striped bordered hovered="sm">
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Total Taxable Value</th>
                  </tr>
                </thead>
                <tbody>
                  {taxRecords.map((item) => (
                    props.tmk === item.TMK &&
                      <tr key={item.Record_ID}>
                        <td>{item.Year}</td>
                        <td>${item.Total_Taxable_Value}</td>
                      </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            
            <div className="pt-1, pb-1">
              <strong>Nearby Schools:</strong>  
              <Table className="pt-5" striped bordered hovered="sm">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Grades Offered</th>
                  </tr>
                </thead>
                <tbody>
                  {nearbySchools.map((school) => (
                      <tr key={school.School_Code}>
                        <td>{school.School_Name}</td>
                        <td>{school.Grade_Level}</td>
                      </tr>
                  ))}
                </tbody>
              </Table>
            </div>

          </Offcanvas.Body>
        </Offcanvas>

      </Card.Body>
    </Card>
  )
}
