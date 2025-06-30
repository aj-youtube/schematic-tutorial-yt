import { SchematicComponent } from "@/components/SchematicComponent"

function Page() {
  return (
    <div className="p-6">
       <h1 className="text-2xl font-semibold mb-4">Manage your Plan</h1> 
       <p>Below you can view and manage your current subscription plan. Make changes or upgrades anytime.</p>
       <div className="rounded-xl border border-gray-200 shadow-sm p-4 bg-white">
            <SchematicComponent componentId="cmpn_ZLKRoQXKbSV" />
       </div>
    </div>
  )
}
export default Page