import Axios from '@/utils/axios';
import axios from 'axios';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export async function GET(request) {
    const headers = new Headers({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });

    // Handle Preflight Request
    if (request.method === 'OPTIONS') {
        return new Response(null, {
            status: 204,
            headers
        });
    }

    // Your actual API logic
    const data = { message: 'CORS is configured!' };

    return new Response(JSON.stringify(data), {
        status: 200,
        headers
    });
}


export const POST = async request => {
  try {
    const formData = await request.formData();
    const userId = formData.get('id');
    const employeeName = formData.get('employeeName');
    const dasignationRole = formData.get('dasignationRole');
    const userName = formData.get('userName');
    const password = formData.get('password');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const address = formData.get('address');
    const reportingTo = formData.get('reportingTo');
    const image = formData.get('image');
    const status = formData.get('status');

    let updatedImage;
    if (image.size) {
      const imageName = image.name.split('.');
      const imageType = imageName[imageName.length - 1];
      updatedImage = new File([image], `${employeeId}.${imageType}`, {
        type: image.type,
      });
    }

    let newUser = {
      EmpName: employeeName,
      DesignationID: dasignationRole,
      Username: userName,
      Email: email,
      Phone: phone,
      Address: address,
      ReportingToUserID: reportingTo,
      Status: Boolean(Number(status))
    };
    if (updatedImage) {
      newUser.Userpicture = updatedImage;
    }
    if (password) {
      newUser.Password = password;
    }

    const res = await Axios.put(
      `?action=update_sndUserWithoutImage&UserID=${userId}`,
      newUser
    );

    console.log(res);

    return Response.redirect(
      `${process.env.URL_DOMAIN}/dashboard/user-employee`
    );
  } catch (error) {
    return new Response('failed to Update User', {
      status: 500,
    });
  }
};
