<template>
  <div class="catalog_wrapper p_page">
    <div class="container">
      <div class="title_page">
        <h1>{{ $locale[$lang].brandPageTitle }}</h1>
      </div>
      <!-- <div class="catalog_content">
        <div class="row">
          <div class="col-xl-3 col-md-4">
            <category-select :categories="BRAND_PRODUCTS" type="brand_id" />
          </div>
          <div class="col-xl-9 col-md-8">
            <products :products="filteredProducts()" type="brandProducts" />
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<style>
</style>