<template>
  <div>
    <div class="position-relative">
      <!-- shape Hero -->
      <section class="section-shaped my-0">
        <div class="shape shape-style-1 shape-default shape-skew">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div class="container shape-container d-flex">
          <div class="col px-0">
            <div class="row">
              <div class="col-lg-6">
                <h1 class="display-3 text-white">
                  New Generation of Appointment System
                  <span>for Universities Environments</span>
                </h1>

                <p class="lead text-white"></p>

                <div class="btn-wrapper">
                  <base-button
                    class="mb-3 mb-sm-0"
                    type="info"
                    @click="goAvailableEnvironments"
                  >
                    View Available Environments
                  </base-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- 1st Hero Variation -->
    </div>

    <section id="available-environments" class="section section-lg">
      <div class="container">
        <div class="row row-grid align-items-center">
          <div class="col-12">
            <div class="pr-md-5">
              <h3>Available Environments</h3>

              <b-table dark striped hover :items="items" :fields="fields1">
                <template #cell(location)="data">
                  <a
                    :href="
                      'https://www.google.com/maps/@' +
                      data.item.location +
                      ',16z'
                    "
                    target="_blank"
                  >
                    {{ data.item.location }}
                  </a>
                </template>
                <template #cell(id)="data">
                  <base-button
                    type="primary"
                    @click="selectEnvironment(data.item)"
                  >
                    Book Now
                  </base-button>
                </template>
              </b-table>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      v-if="selectedEnvironment.id"
      id="checkbook"
      class="section section-lg"
    >
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h3>Working Hours</h3>
          </div>

          <b-table
            dark
            striped
            hover
            :items="selectedEnvironment.working_hours"
            :fields="['start', 'end']"
          >
            <template #cell(start)="data">
              {{ $moment(data.item.start).format("DD MMMM YYYY HH:mm") }}
            </template>
            <template #cell(end)="data">
              {{ $moment(data.item.end).format("DD MMMM YYYY HH:mm") }}
            </template>
          </b-table>

          <div class="col-md-6 mt-3">
            <h5>Select Date</h5>
            <v-date-picker
              v-model="date"
              color="red"
              is-dark
              is-required
              :min-date="new Date()"
              style="width: 100%"
            />
          </div>

          <div class="col-md-6 mt-3">
            <h5>Select Time Range</h5>

            <div class="row mt-2">
              <div class="col-6">
                <h6>Start</h6>
                <v-date-picker
                  v-model="time1"
                  mode="time"
                  color="red"
                  is-dark
                  :minute-increment="15"
                  :min-date="new Date()"
                  :model-config="{
                    type: 'string',
                    mask: 'YYYY-MM-DDTHH:mm:ssZ',
                    timeAdjust: '12:00:00',
                  }"
                />
              </div>

              <div class="col-6">
                <h6>End</h6>
                <v-date-picker
                  v-model="time2"
                  mode="time"
                  color="red"
                  is-dark
                  :minute-increment="15"
                  :min-date="new Date()"
                  :model-config="{
                    type: 'string',
                    mask: 'YYYY-MM-DDTHH:mm:ssZ',
                    timeAdjust: '12:00:00',
                  }"
                />
              </div>
            </div>

            <base-button
              type="success"
              class="d-block mx-auto mt-5"
              @click="checkAvailable"
            >
              Check Availability
            </base-button>
          </div>

          <div v-if="bookingError" class="col-12 mt-3">
            <base-alert type="danger">
              {{ bookingError }}
            </base-alert>
          </div>
        </div>
      </div>
    </section>

    <section v-if="bookingAvailable" id="booknow" class="section section-lg">
      <div class="container">
        <h3>Booking Info</h3>

        <base-alert type="success" class="mt-3">
          <strong>Perfect!</strong>
          The time range you requested is available to book!
        </base-alert>

        <div v-if="$store.state.login" class="row">
          <div class="col-12 mt-3">
            <h6>Tell us why you want to book this time range?</h6>
            <textarea
              v-model="appointment_description"
              class="form-control form-control-alternative"
              rows="10"
              placeholder="Write your text ..."
            ></textarea>
          </div>

          <div class="col-12 mt-3">
            <base-button block icon="fa fa-bookmark" @click="bookNow">
              Book Now
            </base-button>
          </div>

          <div v-if="bookingError2" class="col-12 mt-3">
            <base-alert type="danger">
              {{ bookingError2 }}
            </base-alert>
          </div>
        </div>

        <router-link v-else to="/login">
          <base-button block type="danger" icon="fa fa-sign-in">
            But you have to login first
          </base-button>
        </router-link>
      </div>
    </section>

    <modal
      :show.sync="successModal"
      gradient="success"
      modal-classes="modal-success modal-dialog-centered"
    >
      <h6 slot="header" class="modal-title" id="modal-title-notification">
        SUCCESS
      </h6>

      <div class="py-3 text-center">
        <i class="ni ni-bell-55 ni-3x"></i>
        <h4 class="heading mt-4">Appointment successful!</h4>
        <p>You have successfully completed the application</p>
      </div>

      <template slot="footer">
        <base-button type="whte" class="mx-auto" @click="successModal = false">
          Ok, Got it
        </base-button>
      </template>
    </modal>
  </div>
</template>

<script>
import Api from '@/services/api.service'

import Modal from '@/components/Modal'

export default {
  components: {
    Modal
  },
  data() {
    return {
      date: new Date(),
      time1: new Date(),
      time2: new Date(),

      environments: [],
      selectedEnvironment: {},
      bookingAvailable: false,
      bookingError: '',
      bookingError2: '',
      appointment_description: '',
      successModal: false,

      fields1: ['name', 'location', 'type', 'capacity', 'earliest_app_date', 'id'],
      items: [],
    }
  },
  created() {
    this.getItems()

    const now = this.$moment()
    now.set({second: 0, milisecond: 0})
    const minute = now.minute()

    this.time1 = now.clone().add(this.$moment.duration(15 - minute % 15, 'minutes')).toDate()
    this.time2 = this.$moment(this.time1).add(this.$moment.duration(1, 'hours')).toDate()
  },
  watch: {
    date(newVal, oldVal) {
      const _date = this.$moment(newVal)
      const time1 = this.$moment(this.time1)
      const time2 = this.$moment(this.time2)

      const year = _date.get('year')
      const month = _date.get('month')
      const date = _date.get('date')

      time1.set({ year, month, date })
      time2.set({ year, month, date })

      this.time1 = time1.toDate()
      this.time2 = time2.toDate()
    }
  },
  methods: {
    capitalizeFirstLetter ([ first, ...rest ], locale = navigator.language) {
      return first.toLocaleUpperCase(locale) + rest.join('')
    },

    getItems () {
      this.$store.commit('loading', true)

      Api.get('/environments')
        .then(data => {
          this.environments = data.data.environments
          this.items = data.data.environments
        })
        .catch(err => {

        })
        .finally(() => {
          this.$store.commit('loading', false)
        })
    },

    goAvailableEnvironments () {
      this.$scrollTo('#available-environments', 500)
    },

    async selectEnvironment (item) {
      this.selectedEnvironment = item
      await this.$nextTick()
      this.$scrollTo('#checkbook', 500)
    },

    checkAvailable () {
      this.$store.commit('loading', true)
      this.bookingAvailable = false
      this.bookingError = ''

      Api.post('/appointments/check_available', {
        environment_id: this.selectedEnvironment.id,
        start_date: this.$moment(this.time1).format('YYYY-MM-DDTHH:mm:ssZ'),
        end_date: this.$moment(this.time2).format('YYYY-MM-DDTHH:mm:ssZ')
      })
        .then(async data => {
          this.bookingAvailable = true
          await this.$nextTick()
          this.$scrollTo('#booknow', 500)
        })
        .catch(err => {
          console.log(typeof err.response.data.message, err.response.data.message);
          this.bookingError = this.capitalizeFirstLetter(err.response.data.message)
        })
        .finally(() => {
          this.$store.commit('loading', false)
        })
    },

    bookNow () {
      this.$store.commit('loading', true)
      this.bookingError2 = ''

      Api.post('/appointments', {
        environment_id: this.selectedEnvironment.id,
        start_date: this.$moment(this.time1).format('YYYY-MM-DDTHH:mm:ssZ'),
        end_date: this.$moment(this.time2).format('YYYY-MM-DDTHH:mm:ssZ'),
        description: this.appointment_description
      })
        .then(async data => {
          this.successModal = true

          this.selectedEnvironment = {}
          this.bookingAvailable = false
          this.bookingError = ''
          this.bookingError2 = ''
          this.appointment_description = ''

          await this.$nextTick()
          this.$scrollTo('#available-environments', 500)
        })
        .catch(err => {
          console.log(typeof err.response.data.message, err.response.data.message);
          if (err.response.data.message instanceof Object)
            Object.values(err.response.data.message).forEach(item => {
              this.bookingError2 = item + "\n"
            })
          else this.bookingError2 = err.response.data.message
        })
        .finally(() => {
          this.$store.commit('loading', false)
        })
    }
  }
};
</script>
