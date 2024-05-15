from django.urls import path
from app.api import account, realtor, listing

urlpatterns = [
    # account
    path('signup/', account.SignUpView.as_view(), name='signup'),
    
    # realtor
    path('realtors/', realtor.RealtorListView.as_view(), name='realtors'),
    path('realtor/<int:pk>/', realtor.RealtorDetailView.as_view(), name='realtor-details'),
    path('realtors/topseller/', realtor.TopSellerRealtorView.as_view(), name='realtor-topseller'),

    # listing
    path('listings/', listing.ListingView.as_view(), name='listings'),
    path('listings/<slug>/details/', listing.ListingDetailView.as_view(), name='listing-details'),
    path('listings/search/', listing.SearchListingsView.as_view(), name='search-listings'),

    
]