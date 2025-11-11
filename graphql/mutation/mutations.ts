import { useMutation, gql, useLazyQuery } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        email
      }
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation Signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      user {
        id
        email
      }
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`;

export const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProduct($data: CreateProductInput!) {
    createProduct(data: $data) {
      id
      name
      description
      price
      originalPrice
      category
      images {
        color
        urls
      }
      features
      inStock
      isNew
      isSale
      status
      createdAt
      updatedAt
      variants {
        id
        size
        color
        stock
        batchNo
      }
    }
  }
`;

export const DELETE_PRODUCT_MUTATION = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

export const UPDATE_PRODUCT_MUTATION = gql`
  mutation UpdateProduct($id: ID!, $data: UpdateProductInput!) {
    updateProduct(id: $id, data: $data) {
      name
      description
      price
      originalPrice
      category
      images {
        color
        urls
      }
      features
      inStock
      isNew
      isSale
      status
      createdAt
      updatedAt
      variants {
        id
        size
        color
        stock
        batchNo
      }
    }
  }
`;

export const SEND_OTP_MUTATION = gql`
  mutation SendOtp($phone: String!) {
    sendOtp(phone: $phone)
  }
`;

export const VERIFY_OTP_MUTATION = gql`
  mutation VerifyOtp($phone: String!, $otp: String!) {
    verifyOtp(phone: $phone, otp: $otp) {
      phone
    }
  }
`;

export const LOGOUT_USER_MUTATION = gql`
  mutation LogoutUser {
    logoutUser
  }
`;

export const ADD_ADDRESS = gql`
  mutation AddAddress($data: AddressInput!) {
    addAddress(data: $data) {
      id
      name
      mobile
      pincode
      area
      city
      state
      addressType
    }
  }
`;

export const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile($data: UpdateUserInput!) {
    updateUser(data: $data) {
      phone
      email
      id
      name
    }
  }
`;

export const DELETE_ADDRESS = gql`
  mutation DeleteAddress($deleteAddressId: ID!) {
    deleteAddress(id: $deleteAddressId)
  }
`;

export const UPDATE_ADDRESS = gql`
  mutation UpdateAddress($data: UpdateAddressInput!) {
    updateAddress(data: $data) {
      name
      pincode
      state
    }
  }
`;

export const UPDATE_ADMIN_ACCESS = gql`
  mutation ToggleAccess($id: String!, $isAccess: Boolean!) {
    setAdminAccess(id: $id, isAccess: $isAccess) {
      id
      isAccess
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      success
      message
      order {
        id
        userId
        status
        totalAmount
        paymentMethod
        shippingAddress
        createdAt
        updatedAt
        orderItems {
          id
          productId
          quantity
          price
          name
          size
          color
          batchNo
          product {
            id
            name
            price
            images {
              color
              urls
            }
          }
        }
        user {
          id
          name
          email
          phone
        }
      }
      paymentData {
        success
        orderId
        amount
        currency
        razorpayOrderId
        userDetails {
          name
          email
          contact
        }
      }
    }
  }
`;

export const CONFIRM_ONLINE_ORDER = gql`
  mutation ConfirmOnlineOrder(
    $orderId: String!
    $paymentDetails: PaymentDetailsInput!
  ) {
    confirmOnlineOrder(orderId: $orderId, paymentDetails: $paymentDetails) {
      success
      message
      order {
        id
        userId
        status
        totalAmount
        paymentMethod
        shippingAddress
        createdAt
        updatedAt
        orderItems {
          id
          productId
          quantity
          price
          name
          size
          color
          product {
            id
            name
            price
            images {
              color
              urls
            }
            inStock
            soldCount
          }
        }
        user {
          id
          name
          email
          phone
        }
        payment {
          id
          orderId
          status
          amount
          method
          razorpayOrderId
          razorpayPaymentId
          razorpaySignature
          paidAt
          createdAt
          updatedAt
        }
      }
    }
  }
`;

export const CANCEL_ORDER = gql`
  mutation Mutation($orderId: String!, $reason: String) {
    cancelOrder(orderId: $orderId, reason: $reason) {
      message
      order {
        status
      }
      refundId
      success
    }
  }
`;

export const WRITE_REVIEW = gql`
  mutation Mutation($data: CreateReviewInput!) {
    createReview(data: $data) {
      id
      productId
      userName
      rating
      comment
      date
      verified
      images
    }
  }
`;

export const CREATE_BANNER_MUTATION = gql`
  mutation CreateBanner($data: CreateBannerInput!) {
    createBanner(data: $data) {
      id
      imageUrl
      position
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_BANNER_MUTATION = gql`
  mutation UpdateBanner($id: ID!, $data: UpdateBannerInput!) {
    updateBanner(id: $id, data: $data) {
      id
      imageUrl
      position
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_BANNER_MUTATION = gql`
  mutation DeleteBanner($id: ID!) {
    deleteBanner(id: $id) {
      id
      imageUrl
    }
  }
`;

export const TOGGLE_PRODUCT_TRENDING_MUTATION = gql`
  mutation ToggleProductTrending($id: ID!, $isTrending: Boolean!) {
    toggleProductTrending(id: $id, isTrending: $isTrending) {
      id
      name
      isTrending
      images {
        color
        urls
      }
      variants {
        id
        size
        color
        stock
        batchNo
      }
    }
  }
`;
