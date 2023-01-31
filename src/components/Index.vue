<script setup>
</script>

<template>
    <div class="container py-3">
        <header>
            <nav class="navbar">
                <div class="container-fluid">
                    <div class="row w-100 justify-content-md-between">
                        <div class="col-12 col-md-auto me-md-auto mb-3 mb-md-0">
                            <a class="navbar-brand">Beer index</a>
                        </div>
                        <div class="col-12 col-sm-4 pe-0 mb-3 mb-sm-0">
                            <input class="form-control" type="search" placeholder="Name">
                        </div>
                        <div class="col-12 col-sm-2 col-lg-1 pe-0 mb-3 mb-sm-0">
                            <input class="form-control" type="search" placeholder="IBU">
                        </div>
                        <div class="col-6 col-sm-3 col-md-auto pe-0">
                            <button class="btn btn-success w-100" type="submit">Search</button>
                        </div>
                        <div class="col-6 col-sm-3 col-md-auto pe-0">
                            <button class="btn btn-secondary w-100" type="button">Reset</button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    </div>
</template>