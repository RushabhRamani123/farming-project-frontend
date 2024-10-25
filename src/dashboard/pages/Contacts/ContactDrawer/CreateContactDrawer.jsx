import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useContactStore } from '../../../../app/contactStore';
import { countryCodes } from '../../../../../data';


const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  phoneCode: z.string(),
  phoneNumber: z.string().regex(/^\d+$/, "Phone number should only contain digits"),
  marketingOptIn: z.boolean(),
  email: z.string().email({ message: "Invalid email address" }).optional().or(z.literal('')),
  tags: z.array(z.object({ value: z.string() })),
  companyTags: z.array(z.object({ value: z.string() })),
});


const CreateContactDrawer = ({ isOpen, onClose }) => {
  const addContact = useContactStore((state) => state.addContact);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phoneCode: '+1',
      phoneNumber: '',
      marketingOptIn: false,
      email: '',
      tags: [{ value: '' }],
      companyTags: [{ value: '' }],
    },
  });

  const { fields: tagFields, append: appendTag, remove: removeTag } = useFieldArray({
    control: form.control,
    name: "tags",
  });
  
  const { fields: companyTagFields, append: appendCompanyTag, remove: removeCompanyTag } = useFieldArray({
    control: form.control,
    name: "companyTags",
  });

  const onSubmit = (data) => {
    addContact({
      name: data.name,
      phone: data.phoneNumber,
      phoneCode: data.phoneCode,
      email: data.email || '',
      createdAt: new Date().toISOString().split('T')[0],
      companyTags: data.companyTags.map(tag => tag.value).filter(tag => tag.trim() !== ''),
      tags: data.tags.map(tag => tag.value).filter(tag => tag.trim() !== ''),
    });

    console.log('Contact added:', data);
    form.reset();
    onClose();
  };


  return (  
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create Contact</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
<div className="flex space-x-4">
    <FormField
      control={form.control}
      name="phoneCode"
      render={({ field }) => (
        <FormItem className="flex-shrink-0 w-1/3">
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Code" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {countryCodes.map(({ code, country }) => (
                <SelectItem key={country} value={code}>
                  {country} ({code})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="phoneNumber"
      render={({ field }) => (
        <FormItem className="flex-grow">
          <FormControl>
            <Input placeholder="Enter phone number" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
            <FormField
              control={form.control}
              name="marketingOptIn"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Marketing Opt-In
                    </FormLabel>
                    <p className="text-sm text-muted-foreground">
                      You agree to receive marketing communications from us.
                    </p>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            
<div>
              <FormLabel>Tags</FormLabel>
              {tagFields.map((field, index) => (
                <FormField
                  control={form.control}
                  key={field.id}
                  name={`tags.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center space-x-2 mb-2">
                          <Input {...field} placeholder="Contact Tag" />
                          <Button type="button" variant="outline" onClick={() => removeTag(index)}>
                            Remove
                          </Button>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => appendTag({ value: '' })}
                className="mt-2"
              >
                Add Tag
              </Button>
            </div>

            <div>
              <FormLabel>Company Tags</FormLabel>
              {companyTagFields.map((field, index) => (
                <FormField
                  control={form.control}
                  key={field.id}
                  name={`companyTags.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center space-x-2 mb-2">
                          <Input {...field} placeholder="Company Tag" />
                          <Button type="button" variant="outline" onClick={() => removeCompanyTag(index)}>
                            Remove
                          </Button>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => appendCompanyTag({ value: '' })}
                className="mt-2"
              >
                Add Company Tag
              </Button>
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

export default CreateContactDrawer;