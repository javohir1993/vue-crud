var app = new Vue({
  el: "#app",
  data: {
    prTypes: [],
    selectedTypeId: 0,
    id: null,
    name: null,
    cost: null,
    address: null,
    createdAt: new Date(),
    data: [],
    resData: null,
    isActiveModal: false,
    sort: 0,
    page: 1,
    perPage: 2,
    dataLength: null,

  },//data:

  methods: {

    getTypes() {
      axios.get(`${vars.URL}/get-product-types`)
      .then(res => {
        this.prTypes = res.data
      });
    },

    getData() {
      axios.get(`${vars.URL}?page=${this.page}&perPage=${this.perPage}`)
      .then(res => {
        this.data = res.data
      })

      this.id = null
      this.selectedTypeId = 0
      this.name = null
      this.cost = null
      this.address = null
    },//getData()

    getDataLength() {
      axios.get(`${vars.URL}`)
      .then(res => {
        this.dataLength = Math.ceil(res.data.length / this.perPage)
        this.getData()
      })
    },//getDataLength()

    createItem() {
      axios.post(`${vars.URL}`, {

        "product_type_id": this.selectedTypeId,
        "name_uz": this.name,
        "cost": this.cost,
        "address": this.address,
        "created_date": this.createdAt

      }).then(res => {
        this.resData = res.data
        this.getData()
        this.getDataLength()

        setTimeout(() => this.resData = null, 2000);
      })
    },//createItem()

    editBtn(item) {

      this.id = item.id
      this.selectedTypeId = item.product_type_id
      this.name = item.name_uz
      this.cost = item.cost
      this.address = item.address

    },//editBtn()

    editItem() {
      axios.put(`${vars.URL}`, {
        "id": this.id,
        "product_type_id": this.selectedTypeId,
        "name_uz": this.name,
        "cost": this.cost,
        "address": this.address,
        "created_date": this.createdAt
      }).then(res => {
        this.resData = res.data
        this.getData()
        this.getDataLength()

        setTimeout(() => this.resData = null, 2000);
      })
    },//editItem()

    deleteBtn(id) {
      this.id = id
      this.isActiveModal = true
    },//deleteBtn()

    deleteBtnYes() {
      axios.delete(`${vars.URL}/${this.id}`)
      .then(res => {
        this.resData = res.data
        this.getData()
        this.getDataLength()
      })

      this.isActiveModal = false

      setTimeout(() => this.resData = null, 2000);
    },//deleteBtnYes()

    exit() {
      this.isActiveModal = false
    },//exit()

    sortFn() {

      axios.get(`${vars.URL}`)
      .then(res => {
        if(this.sort == 0) {
          this.getData()
          this.getDataLength()
          return;
        } else {
          var filteredData = res.data.filter(d => this.sort == d.product_type_id)
          this.data = filteredData
        }
      })

    },//sort

    pgClick(page) {
      this.page = page
      this.getData()
    },

  },// methods:

  mounted() {
    this.getTypes()
    this.getData()
    this.getDataLength()
  },//mounted()


})