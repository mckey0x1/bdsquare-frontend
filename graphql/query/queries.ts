import { gql } from "@apollo/client";

export const ME_QUERY = gql`
  query Me {
    me {
      id
      email
      createdAt
      updatedAt
    }
  }
`;
export const ALL_ADMINS = gql`
  query AllAdmins {
    allAdmins {
      id
      email
      isAccess
    }
  }
`;

export const GET_PRODUCTS = gql`
  query Products {
    products {
      id
      name
      description
      price
      originalPrice
      category
      images
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
      }
      reviews {
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
  }
`;
export const GET_USER = gql`
  query UserMe {
    userMe {
      id
      phone
      email
      name
      addresses {
        id
        name
        mobile
        pincode
        area
        city
        state
        addressType
        isDefault
      }
    }
  }
`;

export const GET_USER_ORDER = gql`
  query GetUserOrders($userId: String!) {
    getUserOrders(userId: $userId) {
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
      }
      user {
        id
        name
        email
        phone
      }
      daddress {
        id
        name
        addressType
        area
        city
        state
        pincode
        mobile
      }
      trackingSteps {
        status
        label
        date
        completed
      }
    }
  }
`;

export const GET_ORDERS = gql`
  query GetOrders {
    getOrders {
      id
      userId
      status
      totalAmount
      paymentMethod
      shippingAddress
      createdAt
      updatedAt
      AWB
      ShippingMsg
      ShippingStatus
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
          description
          price
          originalPrice
          category
          images
          features
          inStock
          isNew
          isSale
          status
          createdAt
          updatedAt
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
        paidAt
        razorpaySignature
      }
      daddress {
        id
        name
        addressType
        area
        city
        state
        pincode
        mobile
      }
    }
  }
`;
