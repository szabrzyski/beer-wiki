<script setup>
</script>

<template>
    <div class="container py-3">
        <header class="my-2">
            <nav class="navbar navbar-expand">
                <div class="container">
                    <ul class="navbar-nav d-flex justify-content-center w-100">
                        <div
                            class="row w-100 py-1 align-items-center d-flex justify-content-between justify-content-md-end">
                            <div class="col-12 ps-0 col-md-auto me-md-auto mb-3 mb-md-0">
                                <a class="navbar-brand">Beer index</a>
                            </div>
                            <div class="col-12 col-md-3 ps-0 pe-0 mb-3 mb-md-0">
                                <input class="form-control" type="search" placeholder="Name">
                            </div>
                            <div class="col-12 col-md-3 ps-0 ps-md-3 col-lg-2 pe-0 mb-3 mb-md-0">
                                <div class="input-group">
                                    <input class="form-control w-50" type="search" placeholder="IBU">
                                    <select class="form-select w-50">
                                        <option selected value="">GT</option>
                                        <option value="">LT</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-6 ps-0 ps-md-3 col-md-auto pe-0">
                                <button class="btn btn-success w-100" type="submit">Search</button>
                            </div>
                            <div class="col-6 ps-sm-3 col-md-auto pe-0">
                                <button class="btn btn-secondary w-100" type="button">Reset</button>
                            </div>
                        </div>
                    </ul>
                </div>
            </nav>
        </header>
        <main class="mt-4">
            <div class="container">
                <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
                    <div class="col">
                        <div class="card h-100">
                            <div class="card-body">
                                <h5 class="card-title text-center">Beer name</h5>
                                <div class="row mx-auto">
                                    <div class="col-12 col-md-5 col-xl-6">
                                        IBU: 100
                                    </div>
                                    <div class="col-12 col-md-7 col-xl-6">
                                        FoodPairing: 100
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>