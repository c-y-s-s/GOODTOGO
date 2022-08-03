import Loading from "../pages/Product/component/Loading"
import {  render } from "@testing-library/react";
import '@testing-library/jest-dom';


test('test',()=>{
  const {container} = render(<Loading/>)
  expect(container).toBeInTheDocument()
})