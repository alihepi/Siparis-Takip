import http from "./http-common";

class VenueDataService {
  listAllProducts() {
    return http.get("/products");
  }

  getProduct(id) {
    return http.get(`/products/${id}`);
  }

  addProduct(productData) {
    return http.post('/products', productData);
  }

  updateProduct(id, productData) {
    return http.put(`/products/${id}`, productData);
  }

  deleteProduct(id) {
    return http.delete(`/products/${id}`);
  }

  listAllCustomers() {
    return http.get("/customers");
  }

  getCustomer(id) {
    return http.get(`/customers/${id}`)
  }

  createCustomer(customerData) {
    return http.post("/customers", customerData);
  }

  addSalesToCustomer(id, customerData) {
    return http.post(`/customers/${id}/sales`, customerData);
  }

  updateCustomer(id, customerData) {
    return http.put(`/customers/${id}`, customerData);
  }

  deleteCustomer(id) {
    return http.delete(`/customers/${id}`);
  }

  removeSaleListFromCustomer(id, saleListId){
    return http.delete(`/customers/${id}/sales/${saleListId}`);
  }

}

export default new VenueDataService();