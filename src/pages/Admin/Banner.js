import { BadgeNotif } from "components/BadgeNotification";
import React from "react";
import {
  Button,
  Card,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";

const Banner = ({
  dataImageBanners = [],
  onDeleteDataBanners = null,
  onPostDataBanners = null,
  onChangeDataBanners = null,
  file = null,
}) => {
  return (
    <Card style={{ borderRadius: "8px", padding: "10px", width: "100%" }}>
      <p className="font-xl">List Gambar Banner</p>
      <div className="flex-scrollable">
        <div
          className="d-flex gap-2"
        >
          {dataImageBanners.length != 0 &&
            dataImageBanners.map((x) => {
              return (
                <Card
                  onClick={() => onDeleteDataBanners(x.uuid)}
                  className="d-flex justify-content-center align-items-center zz"
                  style={{
                    cursor: "pointer",
                    height: "100px",
                    width: "120px",
                  }}
                >
                  <img style={{ width: '100%', height: '80px' }} src={x.image_url} alt="" />
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
          controlId="formFile"
          className="mb-3 mt-3"
          style={{ width: "50%" }}
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
            <Button
              type="button"
              onClick={(e) => {
                file != null
                  ? onPostDataBanners(e)
                  : BadgeNotif.show({
                    position: "top",
                    text: "Input gambar terlebih dahulu",
                    variant: "warning",
                  });
              }}
              className="btn-yellow-admin"
            >
              Upload
            </Button>
          </div>
        </FormGroup>
      </div>
    </Card>
  );
};

export default Banner;
