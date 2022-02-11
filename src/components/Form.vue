<script scoped>
  export default {
    name: 'salsac-form',
    data () {
      return {
        salary: 0,
        origSalary: 0,
        annualTax: 0,
        income: 0,
        payPeriodOptions: [
          { text: 'Monthly', value: 'monthly' },
          { text: 'Fortnightly', value: 'biweekly' },
          { text: 'Weekly', value: 'weekly' },
          { text: 'Annually', value: 'annually' }
        ],
        payPeriod: 'monthly',
        costOfPurchase: 0,
        numPaysToCompletePurchase: 0,
        remainingIncome: 0,
        amountSavedOnTax: 0,
      }
    },
    created() {
      this.$watch('salary', (newVal) => {
        this.salary = newVal
        this.origSalary = newVal
        if(newVal) {
          this.annualTax = this.CalculateAnnualTax()
          this.income = this.CalculateIncome()
          console.log(this.annualTax)
        }
      }),
      this.$watch('payPeriod', (newVal) => {
        if(newVal) {
          this.payPeriod = newVal
          this.income = this.CalculateIncome()
          this.remainingIncome = this.CalculateRemainingIncome()
          console.log(this.payPeriod)
        }
      }),
      this.$watch('numPaysToCompletePurchase', (newVal) => {
        if(newVal) {
          this.numPaysToCompletePurchase = newVal
          this.remainingIncome = this.CalculateRemainingIncome()
        }
      })
      this.$watch('costOfPurchase', (newVal) => {
        if(newVal) {
          this.costOfPurchase = newVal
          this.amountSavedOnTax = this.CalculateAmountSavedOnTax()
        }
      })
    },
    methods: {
      CalculateAnnualTax() {
        //Still need to account for Low income tax offset
        //and Low to middle income tax offset
        var medicareLevy = this.salary * 0.02

        if(this.salary < 18200) {
          return Math.round(0 + medicareLevy)
        } else if(this.salary > 18201 && this.salary < 45000) {
          return Math.round(((this.salary - 18200) * 0.19) + medicareLevy)
        } else if(this.salary > 45001 && this.salary < 120000) {
          return Math.round((5092 + ((this.salary - 45001) * 0.325)) + medicareLevy)
        } else if(this.salary > 120001 && this.salary < 180000) {
          return Math.round((29467 + ((this.salary - 120001) * 0.37)) + medicareLevy)
        } else if(this.salary > 180000) {
          return Math.round((51667 + ((this.salary - 180000) * 0.45)) + medicareLevy)
        }
      },
      CalculateIncome() {
        //The really gross Math.round() lines are to make sure the numbers are rounded to the nearest 2 decimal places. Sorry.
        if(this.payPeriod == "monthly") {
          return Math.round((((this.salary - this.annualTax) / 12) + Number.EPSILON) * 100) / 100
        } else if(this.payPeriod == "biweekly") {
          return Math.round((((this.salary - this.annualTax) / 26) + Number.EPSILON) * 100) / 100
        } else if(this.payPeriod == "weekly") {
          return Math.round((((this.salary - this.annualTax) / 52) + Number.EPSILON) * 100) / 100
        } else if(this.payPeriod == "annually") {
          return Math.round((((this.salary - this.annualTax) / 1) + Number.EPSILON) * 100) / 100
        }
      },
      CalculateRemainingIncome() {
        if(this.payPeriod == "monthly") {
          return Math.round(((((this.salary - this.annualTax) / 12) + Number.EPSILON) - (this.costOfPurchase/this.numPaysToCompletePurchase)) * 100) / 100
        } else if(this.payPeriod == "biweekly") {
          return Math.round(((((this.salary - this.annualTax) / 26) + Number.EPSILON) - (this.costOfPurchase/this.numPaysToCompletePurchase)) * 100) / 100
        } else if(this.payPeriod == "weekly") {
          return Math.round(((((this.salary - this.annualTax) / 52) + Number.EPSILON) - (this.costOfPurchase/this.numPaysToCompletePurchase)) * 100) / 100
        } else if(this.payPeriod == "annually") {
          return Math.round(((((this.salary - this.annualTax) / 1) + Number.EPSILON) - (this.costOfPurchase/this.numPaysToCompletePurchase)) * 100) / 100
        }
      },
      CalculateAmountSavedOnTax() {
        this.salary = this.origSalary - this.costOfPurchase

        if(this.payPeriod == "monthly") {
          let saved2 = Math.round(((this.CalculateAnnualTax()) + Number.EPSILON) * 100) / 100
          this.salary = this.origSalary
          return saved2
        } else if(this.payPeriod == "biweekly") {
          let saved2 = Math.round(((this.CalculateAnnualTax()) + Number.EPSILON) * 100) / 100
          this.salary = this.origSalary
          return saved2
        } else if(this.payPeriod == "weekly") {
          let saved2 = Math.round(((this.CalculateAnnualTax()) + Number.EPSILON) * 100) / 100
          this.salary = this.origSalary
          return saved2
        } else if(this.payPeriod == "annually") {
          let saved2 = Math.round(((this.CalculateAnnualTax()) + Number.EPSILON) * 100) / 100
          this.salary = this.origSalary
          return saved2
        }
      }
    }
  }
</script>

<template>
  <!--START FORM-->
  <div class="mt-32">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-white">Salary Sacrifice Calculator</h3>
          <p class="mt-1 text-sm text-slate-300">Use this form to calculate your potential tax savings by making purchases through a salary sacrifice instead of purchasing something after getting paid.</p>
          <p class="mt-1 text-sm text-slate-300">This calculator is an estimate (and a very rough one at that) and should only be used as a guide on potential salary sacrifice savings.</p>
        </div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        <form action="#" method="POST">
          <div class="nm-flat-black-100 overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 bg-neu sm:p-6">
              <div class="grid grid-cols-6 gap-6">
                
                <div class="col-span-3">
                  <label for="salary" class="block text-sm font-medium text-slate-300">Annual Salary</label>
                  <input v-model.lazy="salary" type="text" name="salary" id="salary" class="boxDisplay mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>

                <div class="col-span-3">
                  <label for="annual-tax" class="block text-sm font-medium text-slate-300">Annual Tax</label>
                  <label id="annual-tax" class="boxDisplay mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">{{annualTax}}</label>
                </div>

                <div class="col-span-3">
                  <label for="pay-period" class="block text-sm font-medium text-slate-300">Pay Period</label>
                  <select v-model="payPeriod" id="pay-period" name="pay-period" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option v-for="option in payPeriodOptions" :value="option.value">{{option.text}}</option>
                  </select>
                </div>

                <div class="col-span-3">
                  <label for="income" class="block text-sm font-medium text-slate-300">Income</label>
                  <label id="income" class="boxDisplay mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">{{income}}</label>
                </div>

                <div class="col-span-3">
                  <label for="cost-of-purchase" class="block text-sm font-medium text-slate-300">Cost of Purchase</label>
                  <input v-model.lazy="costOfPurchase" placeholder="To the nearest whole dollar" type="text" name="cost-of-purchase" id="cost-of-purchase" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>

                <div class="col-span-3">
                  <label for="purchase-payment-period" class="block text-sm font-medium text-slate-300">Number of pays to payoff purchase</label>
                  <input v-model="numPaysToCompletePurchase" type="text" name="purchase-payment-period" id="purchase-payment-period" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>

                <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label for="tax-saved" class="block text-sm font-medium text-slate-300">Amount Saved on Tax</label>
                  <label id="tax-saved" class="boxDisplay mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">{{amountSavedOnTax}}</label>
                </div>

                <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label for="new-annual-tax" class="block text-sm font-medium text-slate-300">New Annual Tax</label>
                  <input type="text" name="new-annual-tax" id="new-annual-tax" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>

                <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label for="remaining-income" class="block text-sm font-medium text-slate-300">Remaining Income</label>
                  <label id="remaining-income" class="boxDisplay mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">{{remainingIncome}}</label>
                </div>
              </div>
            </div>
            <div class="px-4 py-3 text-right sm:px-6">
              <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-slate-300 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Calculate</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!--END FORM-->
</template>

<style scoped>
  .neuBorder {
    border-radius: 34px;
    background: #272626;
    box-shadow:  22px 22px 44px #1e1d1d,
                -22px -22px 44px #302f2f;
  };
</style>
