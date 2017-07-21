<template>
  <div id="home">
    <div class="container" style="margin-top: 30px;">
      <div class="row">
      <div class="col-md-8">



        <div class="form-group">

          <div>
    <input type="text" style="width: 100%" v-model="alphabet" v-on:keyup="updateAlphabet">
    </div>
      <button type="button" class="btn btn-primary"  v-on:click.prevent="randomizeAlphabet()" style="margin-top: 10px">Randomize encoding alphabet</button>
      <button type="button" class="btn btn-primary"  style="margin-top: 10px" v-on:click.prevent="resetAlphabet()">Default</button>



    </div>
</div>




<div class="col-md-4">

  <div class="form-group">

    <div>
<input type="text" style="width: 100%" v-model.number="databaseId" @keyup.delete="update" v-on:keypress="update" onkeyup="this.value=this.value.replace(/[^\d]/,'')">
</div>
<button type="button" class="btn btn-primary"  style="margin-top: 10px" v-on:click.prevent="generateDatabaseId()">Random database ID</button>



</div>

</div>





    </div>

    <div class="row" style="margin-top: 50px;">


      <div class="col-md-4">
          <h3 style="background: #fff; margin: 0; padding: 0; border: 1px solid #aaa; padding: 5px; font-weight: 900" class="show-disabled">{{destinationUrl}}</h3>
          <h3 style="margin: 0; font-weight: 900; padding: 0; margin-top: 15px; text-transform: uppercase;">Destination URL</h3>
      </div>





      <div class="col-md-4">
          <h3 style="background: #fff; margin: 0; padding: 0; border: 1px solid #aaa; padding: 5px; font-weight: 900" class="show-disabled">{{encodedId}}</h3>
          <h3 style="margin: 0; font-weight: 900; padding: 0; margin-top: 15px; text-transform: uppercase;">Encoded Database Id</h3>
      </div>


      <div class="col-md-4">
          <h3 style="background: #fff; margin: 0; padding: 0; border: 1px solid #aaa; padding: 5px; font-weight: 900" class="show-disabled">{{decodedId}}</h3>
          <h3 style="margin: 0; font-weight: 900; padding: 0; margin-top: 15px; text-transform: uppercase;">Decoded Database Id</h3>
      </div>
</div>

<div class="row" style="margin-top: 50px;">
  <div class="col-md-12">
    <div class="text-center">
      <ul>
        <li>Insert <strong>databaseId:</strong> <span class="code">{{databaseId}}</span>, <strong>encodedId</strong>: <span class="code">{{encodedId}}</span> and <strong>destinationUrl</strong>: <span class="code">{{destinationUrl}}</span> into database</li>
        <li style="margin-top: 30px;">Display shortlink: <span class="code"><a :href="redirectUrl">{{redirectUrl}}</a></span></li>
      </ul>

    </div>
  </div>

</div>

</div>

<div class="container" style="margin-top: 60px;">
  <div class="row">
  <div class="col-md-12">

<div class="pmd-table-card pmd-card pmd-z-depth">
	<table class="table pmd-table">
		<thead style="background: #aaa;">
			<tr>
				<th class="heavy" style="width: 25%">INFO</th>
				<th class="heavy" style="width: 75%">RESULT</th>

			</tr>
		</thead>
		<tbody>
      <tr>
        <td class="medium">Status</td>
        <td >{{status}}</td>
      </tr>
      <tr>
        <td class="medium">current encodingAlphabet</td>
        <td>{{alphabet}}</td>
      </tr>
      <tr>
        <td class="medium">Alphabet isUnique()?</td>
        <td>{{isUnique}}</td>
      </tr>


      <tr>
        <td class="medium">Conversion</td>
        <td>Base <sub>10</sub> -- Base <sub>{{base}}</sub></td>
      </tr>


      <tr>
        <td class="medium">Random database Id</td>
        <td>{{databaseId}}</td>
      </tr>
      <tr>
      <tr>
        <td class="medium">Encoded database Id</td>
        <td>{{encodedId}}</td>
      </tr>
      <tr>
        <td class="medium">Decoded database Id</td>
        <td>{{decodedId}} <span v-if="databaseId === decodedId">(matches original databaseID: {{databaseId}})</span></td>
      </tr>
      <tr>
        <td class="medium">Example short link:</td>
        <td><a :href="redirectUrl">{{redirectUrl}}</a></td>
      </tr>
      <tr>
        <td class="medium">Example destination url:</td>
        <td>{{destinationUrl}}</td>
      </tr>
		</tbody>
	</table>
</div>
</div>
</div>
</div>




  </div>
</div>
  </div>
</template>

<script>
import Random from "random-js"
let random = new Random(Random.engines.mt19937().autoSeed());

import baseConv from 'bijective-link-shortener'
export default {
  name: 'hello',
  created: function () {
    if (NODE_ENV === 'production') {
          this.siteBase = `http://ls.icjia.cloud/`
      } else {
          this.siteBase = `http://localhost:8080/`
      }
  },
  mounted: function () {
    this.status = "mounted"
    this.alphabet =  baseConv.getAlphabet();
    this.databaseId = random.integer(1000, 99999)
    this.base = this.alphabet.length
    this.encodedId = baseConv.encode(this.databaseId)
    this.decodedId = baseConv.decode(this.encodedId)
    this.redirectUrl = this.siteBase + this.encodedId
    //console.log(getAlphahet())
  },
  methods: {
    init: function () {

    },
    generateDatabaseId: function () {
      this.databaseId = random.integer(1000, 99999)
      this.encodeDecode()
    },
    randomizeAlphabet: function () {
      this.alphabet = baseConv.randomizeAlphabet()
      this.encodeDecode()
    },
    encodeDecode: function () {
      if (!this.isInteger || !this.isPositive) {
        this.databaseId = random.integer(1000, 99999)
        this.update();
      }

      this.encodedId = baseConv.encode(parseInt(this.databaseId))
      this.decodedId = baseConv.decode(this.encodedId)
      this.redirectUrl = this.siteBase + this.encodedId
      this.status = "Encode/Decode"
    },
    resetAlphabet: function () {
      this.alphabet = baseConv.resetAlphabet()
      this.base = this.alphabet.length
      this.encodeDecode()
    },
    update: function () {
        this.isInteger = baseConv.isInteger(this.databaseId)
        this.isPositive = baseConv.isPositive(this.databaseId)
        this.encodeDecode()
    },
    updateAlphabet: function () {
      if ( baseConv.isUnique(this.alphabet) ) {
          baseConv.setAlphabet(this.alphabet)
          this.isUnique = true
          this.base = this.alphabet.length
          this.encodeDecode()
        } else {
          this.isUnique = false
          this.status = "Error: Alphabet must contain all unique characters"
        }
    }
  },
  data () {
    return {
      alphabet: '',
      isUnique: true,
      status: '',
      base: 0,
      databaseId: 0,
      encodedId: '',
      decodedId: 0,
      isInteger: true,
      isPositive: true,
      isUnique: true,
      siteBase: '',
      redirectUrl: '',
      destinationUrl: 'http://www.amazon.com'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.infocol {width: 20%}
.resultcol {width: 80%}
.heavy {font-size: 18px !important;font-weight: 900 !important; color: #fff !important}
.medium {font-weight: 700 !important;}
.code {background: #ccc; font-weight: 900; padding: 3px 10px}
.show-disabled:hover {
    cursor:not-allowed
 }
 ul li {margin-top: 20px;}
</style>
