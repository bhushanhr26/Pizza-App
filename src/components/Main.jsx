import React from "react";
import axios from "axios";
import { Card, ListGroupItem, ListGroup, Button } from "react-bootstrap";
import "./Main.css";
import {
  FormLabel,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
  Checkbox,
  FormGroup,
  MenuItem,
  InputLabel,
  Select,
  Switch,
} from "@mui/material";
import SwitchUnstyled from "@mui/base/SwitchUnstyled";
import Inc from "./Inc";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../action/index";




export default function Main() {
  const [data, setData] = React.useState([]);

  const [pop, setPop] = React.useState(false);

  const [checked, setChecked] = React.useState([]);

  const [radio, setRadio] = React.useState([]);

  const [value, setValue] = React.useState("");
  const [searchKey, setSearchKey] = React.useState("");
  const [sort, setSort] = React.useState(data);
  const [loading, setLoading] = React.useState(true); 
 
  React.useEffect(() => {
    axios
      .get("https://run.mocky.io/v3/ec196a02-aaf4-4c91-8f54-21e72f241b68")
      .then((response) => {
        setLoading(false);
        setData(response.data);
        // console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  React.useState(() => {
    let x = data.filter((y) => {
      return y.name.lowerCase().includes(searchKey.toLocaleLowerCase());
    });
    setData(x)
  }, [searchKey]);
  const sortedData = (data) => {
    if (value === "rating") {
      return data.sort((a, b) => (a.rating > b.rating ? -1 : 1));
    } else if (value === "price") {
      return data.sort((a, b) => (a.price > b.price ? -1 : 1));
    }
  };
  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="text">
      <div>
        <h1>Your's own PIZZA</h1>
      </div>
      
      <div>
        <FormControl>
          <InputLabel placeholder="category" id="demo-simple-select-label">
            {value}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              console.log(e.target.value);
            }}
          >
            <MenuItem value="rating">
              <span>Rating</span>
            </MenuItem>
            <MenuItem value="price">
              <span>Price</span>
            </MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <button onClick={() => setSort(sortedData(data))}>Sort</button>
      </div>
      <div className="main">
        {data.map((x, i) => {
          return (
            <div>
              <div className="div1" key={i}>
                <Card style={{ width: "18rem" }} key={x.id}>
                  <Card.Img variant="top" src={x.img_url} />
                  <Card.Body>
                    <Card.Title>Name: {x.name}</Card.Title>
                    <Card.Text>Description: {x.description}</Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>Rating: {x.rating}</ListGroupItem>
                    <ListGroupItem>Price: {x.price}</ListGroupItem>
                    <ListGroupItem>
                      Type: {x.isVeg || ontoggle ? "Veg" : "Non-Veg"}
                    </ListGroupItem>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setPop(true);
                      }}
                    >
                      Add
                    </Button>
                    {pop ? (
                      <ListGroupItem>
                        {x.size.map((y, i) => {
                          return (
                            <div key={i}>
                              <div>{y.title}</div>
                              <div>
                                {y.items.map((z, i) => {
                                  return (
                                    <div key={i}>
                                      <FormControl>
                                        <FormLabel id="demo-controlled-radio-buttons-group"></FormLabel>
                                        <RadioGroup
                                          aria-labelledby="demo-controlled-radio-buttons-group"
                                          name="controlled-radio-buttons-group"
                                          value={radio}
                                          onChange={(e) => {
                                            setRadio(e.target.value);
                                          }}
                                        >
                                          <FormControlLabel
                                            control={<Radio value={z.size} />}
                                            label={z.size}
                                          />
                                        </RadioGroup>
                                      </FormControl>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                        {x.toppings.map((a, i) => {
                          return (
                            <div key={i}>
                              <div>{a.title}</div>
                              <div>
                                {a.items.map((b, i) => {
                                  return (
                                    <div key={i}>
                                      <div>{b.name}</div>
                                      <Inc />
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </ListGroupItem>
                    ) : (
                      ""
                    )}
                  </ListGroup>
                </Card>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
