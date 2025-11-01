<style type="text/css">
/* 
Generic Styling, for Desktops/Laptops 
*/
.table-hover {
    width: 100%;
    border-collapse: collapse;
    text-align: right;
}
/* Zebra striping */
tr:nth-of-type(odd) { 
  background: #eee; 
}
th { 
  background: #333; 
  color: white; 
  font-weight:normal; 
}
td, th {
    padding: 2px;
    border: 0.5px solid #000000;
    text-align: left;
}

tr:hover {
  background-color: wheat;
}

</style>	


		


<?php error_reporting (E_ALL ^ E_NOTICE); ?> 	

<?php
//include_once 'dbConnection.php';
include_once 'connect.php';
ob_start();

session_start();
$uid = $_SESSION['uid'];


$EID = isset($_GET['E_ID']) ? $_GET['E_ID'] : null;

//echo $EID;

if (isset($_POST['AttendanceDetails'])) {		

$unitid = $_POST['unitid'];
$adate1 = $_POST['adate1'];	
$adate2 = $_POST['adate2'];



//$locid2 = $_POST['locid2'];	
	//echo $locid;
//	echo "salim";
	//exit();

?>


	
<table width="833" align="center">
	<thead class="thead-inverse" style="width: 150%; text-align: left;">
		<tr bgcolor=#0ADAF4>
		  <td colspan="7" bgcolor=#F4F7F8 style="text-align: left"><h3 align="center"><strong>Details Present/Late/Absent Information</strong></h3>
	      <h4 align="center"><strong>Date From: <?php echo $adate1; ?> To <?php echo $adate2; ?></strong></h4></p></td>
	  </tr>
		<tr bgcolor=#0ADAF4>
		  <td colspan="7" bgcolor=#F7F9FB style="text-align: left">&nbsp;</td>
	  </tr>
		<tr bgcolor=#0ADAF4>
		  <td width="70" bgcolor=#B2E1F8 style="text-align: left"><strong>SL#</strong></td>
		  <td width="150" bgcolor="#B2E1F8" style="text-align: left"><strong>EmployeeID</strong></td>
		  <td width="252" bgcolor="#B2E1F8" style="text-align: left"><strong>Name</strong></td>
		  <td width="186" bgcolor="#B2E1F8"><strong>Designation</strong></td>
		  <td width="108" bgcolor="#B2E1F8"><strong>In-Time</strong></td>
		  <td width="108" bgcolor="#B2E1F8"><strong>Out-Time</strong></td>
		<td width="108" bgcolor="#B2E1F8"><strong>Status</strong></td>	
	  </tr>
	  <?php
$tint=0;	
$tidl=0;	
if ($unitid<>'')
{
	$salim7 = "where CompanyId = $unitid";
}	

if ($unitid=='')
{
	$salim7 = " where CompanyId in (2)";
}	
/*	
$result2 = "select  CmnCompanyId, (select name from CmnCompanies where CmnCompanies.id = HrmEmployees.CmnCompanyId) as CompanyName,count(id) as NoOfEmp from HrmEmployees where $salim7 and IsActive =1 and IsHeadOffice = 1
group by CmnCompanyId";
*/
$tte=0;	
$ttp=0;
$ttl=0;	
$tta=0;		
$result2 = "select distinct companyid,CompanyName from BIEmpInfo
 $salim7";	
//echo $result2;
	$params = array();
    $options =  array( "Scrollable" => SQLSRV_CURSOR_KEYSET );
    $stmt2 = sqlsrv_query( $conn, $result2 , $params, $options );	
	
	while( $row2 = sqlsrv_fetch_array($stmt2) ) {
	$CmnComId = $row2['companyid'];

$sc++;		
		
	
?>		
		
	<tr>
	  <td bgcolor=#F8F5AD style="text-align: left"><strong><?php echo $sc; ?></strong></td>
	  <td bgcolor="#F8F5AD" style="text-align: left">&nbsp;</td>
	  <td  bgcolor="#F8F5AD" style="text-align: left"><a href="dash.php?q=10&unitid=<?php echo $row2["CmnCompanyId"]; ?>"><strong><?php echo  $row2['CompanyName']; ?></strong></td>
	  <td bgcolor="#F8F5AD" style="text-align: left">&nbsp;</td>
	  <td bgcolor="#F8F5AD" style="text-align: left">&nbsp;</td>
	  <td bgcolor="#F8F5AD" style="text-align: left">&nbsp;</td>
	<td bgcolor="#F8F5AD" style="text-align: left">&nbsp;</td>	
	  </tr>
	<tr>

<?php	
		
/*		
$result = "select  CmnCompanyId, HrmSectionId,
(select (select (select name from HrmDepartments where HrmDepartments.id = HrmCompanyDepartments.HrmDepartmentId) from HrmCompanyDepartments where HrmCompanyDepartments.id = HrmSections.HrmCompanyDepartmentId)
 from HrmSections where HrmSections.id = HrmEmployees.HrmSectionId) as Department,
(select name from CmnCompanies where CmnCompanies.id = HrmEmployees.CmnCompanyId) as CompanyName,count(id) as NoOfEmp 
from HrmEmployees where CmnCompanyId = $CmnCompanyId and IsActive =1 and IsHeadOffice = 1
group by CmnCompanyId,HrmSectionId";
*/

$result = "delete from HRMTemp01";		
	$params = array();
    $options =  array( "Scrollable" => SQLSRV_CURSOR_KEYSET );
    $stmt1 = sqlsrv_query( $conn, $result , $params, $options );	

$result = "insert into HRMTemp01(Date1,EmployeeID,CardNo,MinTimes,MaxTimes,Remarks,AttStatus)
SELECT 
    CONVERT(CHAR(11), HrmAttendances.InOutTime, 120) AS Date1, 
    Emp.EmployeeID, 
    HrmAttendances.CardNo, 
    CASE 
        WHEN MIN(CONVERT(VARCHAR(5), InOutTime, 108)) BETWEEN '06:00' AND '11:59' 
        THEN MIN(CONVERT(VARCHAR(5), InOutTime, 108)) 
        ELSE '' 
    END AS MinTimes, 
    CASE 
        WHEN MAX(CONVERT(VARCHAR(5), InOutTime, 108)) BETWEEN '12:00' AND '23:59' 
        THEN MAX(CONVERT(VARCHAR(5), InOutTime, 108)) 
        ELSE '' 
    END AS MaxTimes, 
    HrmAttendances.Remarks, 
    CASE 
        WHEN MIN(CONVERT(VARCHAR(5), InOutTime, 108)) BETWEEN '06:00' AND '10:00' THEN 'P' 
        WHEN MIN(CONVERT(VARCHAR(5), InOutTime, 108)) BETWEEN '10:01' AND '11:59' THEN 'L' 
        ELSE 'A' 
    END AS AttStatus 
FROM HrmAttendances 
INNER JOIN HrmEmployees AS Emp ON Emp.AttCardNo = HrmAttendances.CardNo 
WHERE 
    CONVERT(CHAR(11), InOutTime, 120) BETWEEN '$adate1' and '$adate2'
    AND LTRIM(RTRIM(Emp.EmployeeID)) = LTRIM('$EID')
GROUP BY 
    CONVERT(CHAR(11), InOutTime, 120), 
    Emp.EmployeeID, 
    HrmAttendances.CardNo, 
    HrmAttendances.Remarks;
";

	$params = array();
    $options =  array( "Scrollable" => SQLSRV_CURSOR_KEYSET );
    $stmt1 = sqlsrv_query( $conn, $result , $params, $options );


/*		
$result = "insert into HRMTemp01(Date1, CmnCompany, ProjectName, Department,Designation, EmployeeID, CardNo, Name,  AttStatus)
select '$adate',CompanyName,  ProjectName, DepartmentName, Designation, EmployeeID, AttCardNo, EmpName, 'A' from BIEmpInfo
where AttCardNo not in (select CardNo from HRMTemp01)";		
	$params = array();
    $options =  array( "Scrollable" => SQLSRV_CURSOR_KEYSET );
    $stmt1 = sqlsrv_query( $conn, $result , $params, $options );	
*/
		
$result = "update HRMTemp01 set 
HRMTemp01.CmnCompanyid = BIEmpInfo.Companyid,
HRMTemp01.CmnCompany = BIEmpInfo.CompanyName,
HRMTemp01.Designation = BIEmpInfo.Designation, 
HRMTemp01.Department = BIEmpInfo.DepartmentName,  
HRMTemp01.ProjectName = BIEmpInfo.ProjectName,
HRMTemp01.Name = BIEmpInfo.EmpName
from BIEmpInfo
where HRMTemp01.CardNo = BIEmpInfo.AttCardNo";		
	$params = array();
    $options =  array( "Scrollable" => SQLSRV_CURSOR_KEYSET );
    $stmt1 = sqlsrv_query( $conn, $result , $params, $options );			
		
$result = "select distinct CmnCompany as CompanyName,Department, 
(select count(hrm.Name)  from HRMTemp01 as hrm where hrm.Department = HRMTemp01.Department and hrm.CmnCompany = HRMTemp01.CmnCompany) as NoOfEmp,
(select count(attstatus)  from HRMTemp01 as hrm where hrm.Department = HRMTemp01.Department and hrm.CmnCompany = HRMTemp01.CmnCompany and hrm.AttStatus = 'P') as Present,
(select count(attstatus)  from HRMTemp01 as hrm where hrm.Department = HRMTemp01.Department and hrm.CmnCompany = HRMTemp01.CmnCompany and hrm.AttStatus = 'L') as Late,
(select count(attstatus)  from HRMTemp01 as hrm where hrm.Department = HRMTemp01.Department and hrm.CmnCompany = HRMTemp01.CmnCompany and hrm.AttStatus = 'A') as Absent
from HRMTemp01
where CmnCompanyid = $CmnComId
group by CmnCompany,Department";		
	$params = array();
    $options =  array( "Scrollable" => SQLSRV_CURSOR_KEYSET );
    $stmt1 = sqlsrv_query( $conn, $result , $params, $options );			
//echo $result;			
/*		
$result = "select  companyid as CmnCompanyId,CompanyName, DepartmentName as Department, count(empname) as NoOfEmp from BIEmpInfo
where companyid = $CmnCompanyId
group by companyid,DepartmentName,CompanyName";		
		
//echo $result;		
	$params = array();
    $options =  array( "Scrollable" => SQLSRV_CURSOR_KEYSET );
    $stmt1 = sqlsrv_query( $conn, $result , $params, $options );	
		
*/
$te=0;
$tp=0;
$tl=0;
$ta=0;	
$c=0;		
while( $row = sqlsrv_fetch_array($stmt1) ) {

	$Department = $row['Department'];
	$NoOfEmp = $row['NoOfEmp'];
	$Present = $row['Present'];
	$Late = $row['Late'];
	$Absent = $row['Absent'];
	
$c++;
?>		
		
		<td width="70" bgcolor=#92C3F4 style="text-align: left"><strong>&nbsp;&nbsp;<?php echo $c; ?></strong></td>
		  <td colspan="2" width="252" bgcolor="#92C3F4" style="text-align: left">&nbsp;&nbsp;<strong><?php echo $Department; ?></strong></td>
		  <td width="186" bgcolor="#92C3F4"><strong>No of Record: <?php echo $NoOfEmp; ?></strong></td>
		  <td width="108" bgcolor="#92C3F4"><strong>Present: <?php echo $Present ?></strong></td>
		  <td width="108" bgcolor="#92C3F4"><strong>Late: <?php echo $Late ?></strong></td>
		<td width="108" bgcolor="#92C3F4"><strong>Absent: <?php echo $Absent  ?></strong></td>
	  </tr>
<?php	
	$result4 = "select Date1, CmnCompanyid, CmnCompany, ProjectName, Department,EmployeeID, CardNo, Name, Designation, MinTimes, MaxTimes, AttStatus, Remarks from HRMTemp01 
	where CmnCompanyid = '$CmnComId' and Department = '$Department' order by department";
	$params = array();
    $options =  array( "Scrollable" => SQLSRV_CURSOR_KEYSET );
    $stmt12 = sqlsrv_query( $conn, $result4 , $params, $options );	
$cc=0;	
	while( $row4 = sqlsrv_fetch_array($stmt12) ) {
	
	$EmployeeID = $row4['EmployeeID'];
	$Name = $row4['Name'];
	$Designation = $row4['Designation'];
	$MinTimes = $row4['MinTimes'];
	$MaxTimes = $row4['MaxTimes'];
	$AttStatus = $row4['AttStatus'];
$cc++;		
?>	
	<tr>
	  <td bgcolor=#EBEDEF style="text-align: left"><strong>&nbsp;&nbsp;&nbsp;<?php echo $cc; ?></strong></td>
	  <td bgcolor="#EBEDEF" style="text-align: left"><strong>&nbsp;&nbsp;&nbsp;<?php echo $EmployeeID; ?></strong></td>
	  <td bgcolor="#EBEDEF" style="text-align: left"><strong>&nbsp;&nbsp;&nbsp;<?php echo $Name; ?></strong></td>
	  <td bgcolor="#EBEDEF"><strong><?php echo $Designation; ?></strong></td>
	  <td bgcolor="#EBEDEF"><strong><?php echo $MinTimes; ?></strong></td>
	  <td bgcolor="#EBEDEF"><strong><?php echo $MaxTimes; ?></strong></td>
	  <td bgcolor="#EBEDEF"><strong><?php echo $AttStatus; ?></strong></td>
	  </tr>
<?php 

	}
$te=$te+$NoOfEmp;
$tp=$tp+$Present;
$tl=$tl+$Late;		
$ta=$ta+$Absent;	

} ?>		

		<tr>
	  <td colspan="3" bgcolor=#96B0F8 style="text-align: left"><strong>Sub Total:</strong></td>
	  <td bgcolor="#96B0F8"><strong><?php echo $te; ?></strong></td>
	  <td bgcolor="#96B0F8"><strong><?php echo $tp; ?></strong></td>
	  <td bgcolor="#96B0F8"><strong><?php echo $tl; ?></strong></td>
	  <td bgcolor="#96B0F8"><strong><?php echo $ta; ?></strong></td>
	  </tr>
	<?php 
$tte=$tte+$te;
$ttp=$ttp+$tp;
$ttl=$ttl+$tl;
$tta=$tta+$ta;		
 ?>		
<?php } ?>		

		<tr>
	  <td colspan="3" bgcolor=#96B0F8 style="text-align: left"><strong>Grand Total:</strong></td>
	  <td bgcolor="#96B0F8"><strong><?php echo $tte; ?></strong></td>
	  <td bgcolor="#96B0F8"><strong><?php echo $ttp; ?></strong></td>
	  <td bgcolor="#96B0F8"><strong><?php echo $ttl; ?></strong></td>
	 <td bgcolor="#96B0F8"><strong><?php echo $tta; ?></strong></td>	
	  </tr>	

		
		
  </thead>
	<tbody>	
	
	</table>
	

<?php 

}
?>
