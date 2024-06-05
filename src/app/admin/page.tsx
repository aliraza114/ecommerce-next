import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/db/db";
import { formatCurrency } from "@/db/formatters";

async function getSalesData() {
    const data = await db.order.aggregate({
        _sum: { pricePaidInCents: true },
        _count: true
    })

    return {
        amount: (data._sum.pricePaidInCents || 0) / 100,
        numberOfSales: data._count
    }
}


export default async function AdminDashboard() {
  const salesData = await getSalesData();  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardCard title="Sales" subtitle={formatCurrency(salesData.numberOfSales)} body={formatCurrency(salesData.amount)} />
    </div>
  )
}

type DashboardCardProps = {
    title: string
    subtitle: string
    body: string
}

function DashboardCard({title, subtitle, body}: DashboardCardProps) {
    return <Card>
    <CardTitle>{title}</CardTitle>
    <CardDescription>{subtitle}</CardDescription>
    <CardContent>
        <p>
            {body}
        </p>
    </CardContent>
</Card>
}