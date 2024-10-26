import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useCropStore } from '../../../../app/contactStore';
const formSchema = z.object({
  crop: z.object({
    name: z.string().min(1, { message: "Crop name is required" }),
    qnt: z.string().regex(/^\d+$/, "Quantity should only contain digits")
  }),
  sold_at: z.string().regex(/^\d+$/, "Selling price should only contain digits"),
  expense: z.object({
    seeds: z.string().regex(/^\d+$/, "Seed cost should only contain digits"),
    fertilizers: z.array(z.object({
      name: z.string().min(1, { message: "Fertilizer name is required" }),
      cost: z.string().regex(/^\d+$/, "Cost should only contain digits")
    })),
    electricity: z.string().regex(/^\d+$/, "Electricity cost should only contain digits"),
    machinery: z.string().regex(/^\d+$/, "Machinery cost should only contain digits"),
    labor: z.string().regex(/^\d+$/, "Labor cost should only contain digits"),
    water_usage: z.string().regex(/^\d+$/, "Water usage cost should only contain digits"),
    storage: z.string().regex(/^\d+$/, "Storage cost should only contain digits"),
    transport: z.string().regex(/^\d+$/, "Transport cost should only contain digits"),
    pesticides: z.array(z.object({
      name: z.string().min(1, { message: "Pesticide name is required" }),
      cost: z.string().regex(/^\d+$/, "Cost should only contain digits")
    }))
  })
});

const CreateCropForm = ({ isOpen, onClose }) => {
  const addCrop = useCropStore((state) => state.addContact);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      crop: {
        name: '',
        qnt: ''
      },
      sold_at: '',
      expense: {
        seeds: '',
        fertilizers: [{ name: '', cost: '' }],
        electricity: '',
        machinery: '',
        labor: '',
        water_usage: '',
        storage: '',
        transport: '',
        pesticides: [{ name: '', cost: '' }]
      }
    },
  });

  const { fields: fertilizerFields, append: appendFertilizer, remove: removeFertilizer } = useFieldArray({
    control: form.control,
    name: "expense.fertilizers"
  });

  const { fields: pesticideFields, append: appendPesticide, remove: removePesticide } = useFieldArray({
    control: form.control,
    name: "expense.pesticides"
  });

  const onSubmit = (data) => {
    // Convert string values to numbers for numerical fields
    const formattedData = {
      crop: {
        name: data.crop.name,
        qnt: data.crop.qnt
      },
      sold_at: parseInt(data.sold_at),
      expense: {
        seeds: parseInt(data.expense.seeds),
        fertilizers: data.expense.fertilizers.map(f => ({
          name: f.name,
          cost: parseInt(f.cost)
        })),
        electricity: parseInt(data.expense.electricity),
        machinery: parseInt(data.expense.machinery),
        labor: parseInt(data.expense.labor),
        water_usage: parseInt(data.expense.water_usage),
        storage: parseInt(data.expense.storage),
        transport: parseInt(data.expense.transport),
        pesticides: data.expense.pesticides.map(p => ({
          name: p.name,
          cost: parseInt(p.cost)
        }))
      }
    };
    console.log(formattedData);
    addCrop({
      crop: {
        name: data.crop.name,
        qnt: data.crop.qnt
      },
      sold_at: parseInt(data.sold_at),
      expense: {
        seeds: parseInt(data.expense.seeds),
        fertilizers: data.expense.fertilizers.map(f => ({
          name: f.name,
          cost: parseInt(f.cost)
        })),
        electricity: parseInt(data.expense.electricity),
        machinery: parseInt(data.expense.machinery),
        labor: parseInt(data.expense.labor),
        water_usage: parseInt(data.expense.water_usage),
        storage: parseInt(data.expense.storage),
        transport: parseInt(data.expense.transport),
        pesticides: data.expense.pesticides.map(p => ({
          name: p.name,
          cost: parseInt(p.cost)
        }))
      }
    });
    form.reset();
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Add New Crop</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            {/* Crop Details */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="crop.name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Crop Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter crop name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="crop.qnt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter quantity" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sold_at"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Selling Price</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter selling price" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Expenses */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Expenses</h3>
              
              <FormField
                control={form.control}
                name="expense.seeds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seeds Cost</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter seeds cost" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Fertilizers */}
              <div className="space-y-2">
                <FormLabel>Fertilizers</FormLabel>
                {fertilizerFields.map((field, index) => (
                  <div key={field.id} className="flex space-x-2">
                    <FormField
                      control={form.control}
                      name={`expense.fertilizers.${index}.name`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="Fertilizer name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`expense.fertilizers.${index}.cost`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="Cost" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="button" variant="outline" onClick={() => removeFertilizer(index)}>
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => appendFertilizer({ name: '', cost: '' })}
                >
                  Add Fertilizer
                </Button>
              </div>

              {/* Other Expenses */}
              <FormField
                control={form.control}
                name="expense.electricity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Electricity Cost</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter electricity cost" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expense.machinery"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Machinery Cost</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter machinery cost" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expense.labor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Labor Cost</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter labor cost" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expense.water_usage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Water Usage Cost</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter water usage cost" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expense.storage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Storage Cost</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter storage cost" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expense.transport"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transport Cost</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter transport cost" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Pesticides */}
              <div className="space-y-2">
                <FormLabel>Pesticides</FormLabel>
                {pesticideFields.map((field, index) => (
                  <div key={field.id} className="flex space-x-2">
                    <FormField
                      control={form.control}
                      name={`expense.pesticides.${index}.name`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="Pesticide name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`expense.pesticides.${index}.cost`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="Cost" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="button" variant="outline" onClick={() => removePesticide(index)}>
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => appendPesticide({ name: '', cost: '' })}
                >
                  Add Pesticide
                </Button>
              </div>
            </div>

            <div className="pt-4 space-x-2 flex justify-end">
              <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
              <Button type="submit" className="bg-blue-500 text-white">Submit</Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default CreateCropForm;