angular.module("gearApp").service("mainServ", function($http) {

    this.postNewUser = function(user) {
        return $http({
            method: "POST",
            url: "/login",
            data: user
        }).then(function(response) {
            return response.data;
        })
    };
    this.getCurrentUser = function() {
        return $http({
            method: "GET",
            url: "/current"
        }).then(function(response) {
            return response.data;
        })
    }

    this.logout = function() {
        return $http({
            method: "GET",
            url: "/logout"
        }).then(function(resp) {
            return resp;
        })
    };

    this.updateTheUser = function(currentUser) {
        return $http({
            method: "PUT",
            url: "/current/" + currentUser._id,
            data: currentUser
        }).then(function(response) {
            console.log(response);
            return response.data;
        });
    };

    this.deleteUser = function(currentUser) {
        return $http({
            method: "DELETE",
            url: '/current/' + currentUser._id,
        }).then(function(response) {
            return response.data;
        });
    };

    this.postNewItem = function(item) {
        return $http({
            method: "POST",
            url: "/items",
            data: item
        }).then(function(response) {
            return response.data;
        })
    };

    this.getCurrentItem = function() {
        return $http({
            method: "GET",
            url: "/items"
        }).then(function(response) {
            return response.data;
        })
    };

    this.getItemsRented = function() {
        return $http({
            method: "GET",
            url: "/rentals"
        }).then(function(response) {
            return response.data;
        })
    };

    this.updateTheItem = function(currentItem) {
        return $http({
            method: "PUT",
            url: "/items/" + currentItem._id,
            data: currentItem
        }).then(function(response) {
            console.log(response);
            return response.data;
        });
    };

    this.updateItemsRented = function(currentItem) {
        return $http({
            method: "PUT",
            url: "/items/" + currentItem._id,
            data: currentItem
        }).then(function(response) {
            console.log(response);
            return response.data;
        })
    }

    this.getAllItems = function() {
        return $http({
            method: "GET",
            url: "/items",
        }).then(function(response) {
            return response.data;
        })
    };

    this.deleteTheItem = function(itemToDelete) {
        return $http({
            method: "DELETE",
            url: "/items/" + itemToDelete._id,
        }).then(function(response) {
            return response;
        })
    };

});
