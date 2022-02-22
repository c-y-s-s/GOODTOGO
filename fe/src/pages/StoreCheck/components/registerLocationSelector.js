import React, { useState, Component } from 'react';
import ReactDOM from 'react-dom';
import TWzipcode from 'react-twzipcode';

const citySelector () => {
    const [data, setData] = useState({
        county: "",
        district: "",
        zipcode: ""
      });



  handleChange = (data) => {
    console.log(data);
  };

  render() {
    return (
      <div>
        <TWzipcode
          css={['form-control county-sel', 'form-control district-sel', 'form-control zipcode']}
          handleChangeCounty={this.handleChange}
          handleChangeDistrict={this.handleChange}
          handleChangeZipcode={this.handleChange}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));