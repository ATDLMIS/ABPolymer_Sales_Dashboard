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
    const employeeId = formData.get('employeeId');
    const employeeName = formData.get('employeeName');
    const dasignationRole = formData.get('dasignationRole');
    const userName = formData.get('userName');
    const password = formData.get('password');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const address = formData.get('address');
    const reportingTo = formData.get('reportingTo');
    const image = formData.get('image');

    const imageName = image.name.split('.');
    const imageType = imageName[imageName.length - 1];
    const updatedImage = new File([image], `${employeeId}.${imageType}`, {
      type: image.type,
    });

    const datawillBeSend = new FormData();

    datawillBeSend.append('EmployeeID', employeeId);
    datawillBeSend.append('EmpName', employeeName);
    datawillBeSend.append('DesignationID', dasignationRole);
    datawillBeSend.append('Username', userName);
    datawillBeSend.append('Password', password);
    datawillBeSend.append('Email', email);
    datawillBeSend.append('Phone', phone);
    datawillBeSend.append('Address', address);
    datawillBeSend.append('ReportingToUserID', reportingTo);
    datawillBeSend.append('Status', 0);
    datawillBeSend.append('Userpicture', updatedImage);

    const res = await Axios.post(
      '?action=create_sndUser',
      datawillBeSend,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    console.log(res);

    return Response.redirect(`${process.env.URL_DOMAIN}`);
  } catch (error) {
    return new Response('failed to add User', {
      status: 500,
    });
  }
};
