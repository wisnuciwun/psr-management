import React from 'react'
import { Button, Card, FormControl, FormGroup, FormLabel } from 'react-bootstrap';

const Banner = ({dataImageBanners = [], onDeleteDataBanners=null,onPostDataBanners=null, onChangeDataBanners=null, }) => {
  
  return (
    <Card>
     <div>
    <p>List Gambar Banner</p>
    <div
      className="d-flex"
      // style={{ gap: "8px", overflowX: "scroll" }}
    >
      {dataImageBanners.length != 0 &&
        dataImageBanners.map((x) => {
          return (
            <Card
              onClick={() => onDeleteDataBanners(x.uuid)}
              className="d-flex justify-content-center align-items-center"
              style={{
                cursor: "pointer",
                height: "100px",
                width: "120px",
              }}
            >
              <img className="w-100" src={x.image_url} alt="" />
              <div
                className="position-absolute bg-light d-flex justify-content-center align-items-center"
                style={{
                  borderRadius: "50%",
                  height: "25px",
                  width: "25px",
                  opacity: "80%",
                }}
              >
                <i className="fa fa-trash text-dark"></i>
              </div>
            </Card>
          );
        })}
    </div>
  </div>
    <div>
                <FormGroup
                  onSubmit={onPostDataBanners}
                  controlId="formFile"
                  className="mb-3"
                >
                  <FormLabel>Upload Foto Banner</FormLabel>
                  <div className="d-flex" style={{ gap: "8px" }}>
                    <FormControl
                      placeholder="Pastikan format file adalah pdf"
                      type="file"
                      size="md"
                      className="h-100"
                      onChange={onChangeDataBanners}
                    />
                    <Button type="submit" onClick={onPostDataBanners}>
                      Upload
                    </Button>
                  </div>
                </FormGroup>
              </div>
    </Card>
   
  )
}

export default Banner