'use strict'
import React, {Component} from 'react';
import App from '.App.jsx';
console.log("rendering <searchBar/>");
const searchBar = react.createclass({
  render: function () {
    return (
      <div>
        <script>
          let input = document.getElementById('searchTextField');
          autocomplete = new google.maps.places.Autocomplete();
        </script>
      </div>
    );
  }
});
export default searchBar