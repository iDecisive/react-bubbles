import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const [newColor, setNewColor] = useState(initialColor);

  //New color form

  let newColorFormInput = event => {

    switch(event.target.name) {

      case 'color': 
      
        setNewColor({

          ...newColor,
          color: event.target.value

        })

      break;
      
      case 'hex':

        setNewColor({

          ...newColor,
          code: { hex: event.target.value }

        })

      break;


    }

  }

  let submitNewColor = event => {

    event.preventDefault();

    axiosWithAuth()
    .post('http://localhost:5000/api/colors', newColor)
    .then(response => {

      console.log(response)

      axiosWithAuth()
      .get('http://localhost:5000/api/colors')
      .then(response => {
        updateColors(response.data);
        console.log(response)
      })
      .catch(error => console.log(error));

    })
    .catch(error => console.log(error))

  }

  //Edit color form

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?

    axiosWithAuth()
    .put(`http://localhost:5000/api/colors/${colorToEdit.id}`,colorToEdit)
    .then(response => {
      
      console.log(response)
    
      axiosWithAuth()
      .get('http://localhost:5000/api/colors')
      .then(response => {
        updateColors(response.data);
        console.log(response)
      })
      .catch(error => console.log(error));

    })
    .catch(error => console.log(error))

  };

  

  const deleteColor = color => {
    // make a delete request to delete this color

    axiosWithAuth() //Deletes color and then...
    .delete(`http://localhost:5000/api/colors/${color.id}`)
    .then(response => {
    
      console.log(response)

      axiosWithAuth() //...then fetches all colors on server to update local state
      .get('http://localhost:5000/api/colors')
      .then(response => {
        updateColors(response.data);
        console.log(response)
      })
      .catch(error => console.log(error));
    
    })
    .catch(error => console.log(error))

  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    
      <form onSubmit={submitNewColor}>
              Add a new color

        <label>
          Color name
          <input type='text' name='color' onChange={newColorFormInput}/>
        </label>

        <label>
          HEX Value
          <input type='text' name='hex' onChange={newColorFormInput}/>
        </label>

              <button>Submit</button>

      </form>
    
    </div>
  );
};

export default ColorList;
